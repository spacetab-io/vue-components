import debounce from 'lodash/debounce';
import merge from 'lodash/merge';
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';

import StDropdownOption from '../dropdown-option/index.vue';
import StDropdown from '../dropdown/index.vue';
import StDropdownScript from '../dropdown/script';
import { DropdownBindProperties } from '../dropdown/types';
import StInput from '../input/script';
import {
  PopperPlacement,
  TriggerType,
} from '../popper/types';
import {
  DebounceGetSuggestions,
  FetchSuggestions,
  Suggestion,
} from './types';


@Component({
  name: 'StAutocomplete',
  components: {
    StDropdown,
    StDropdownOption,
  },
})
export default class StAutocomplete extends Vue {
  @Prop({ type: String, default: '' })
  value!: string;

  @Prop({ type: Function, required: true })
  fetchSuggestions!: FetchSuggestions<Suggestion>;

  @Prop({ type: Number, default: 300 })
  fetchSuggestionsDelay!: number;

  @Prop(Boolean)
  fetchOnFocus!: boolean;

  @Prop(Boolean)
  focusAfterClear!: boolean;

  @Prop({ type: Number, default: 1 })
  queryMinLength!: number;

  @Prop({ type: Boolean, default: true })
  closeOnSelect!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnClear!: boolean;

  @Prop(String)
  prefixIcon!: string;

  @Prop(String)
  suffixIcon!: string;

  @Prop(String)
  size!: string;

  @Prop({ type: Boolean, default: true })
  clearable!: boolean;

  @Prop(Boolean)
  required!: boolean;

  @Prop(Boolean)
  disabled!: boolean;

  @Prop(Boolean)
  readonly!: boolean;

  @Prop(String)
  placeholder!: string;

  @Prop(Boolean)
  loading!: boolean;

  @Prop({ type: Object, default: () => ({}) })
  dropdownProps!: DropdownBindProperties;

  extendedDropdownProps: DropdownBindProperties = {
    arrowVisible: false,
    placement: PopperPlacement.bottomStart,
    trigger: TriggerType.manual,
    boundariesSelector: 'body',
  };

  inputValue: string = '';

  suggestions: Suggestion[] = [];

  debounceGetSuggestions: DebounceGetSuggestions = () => {};

  searchLoading: boolean = false;

  popperVisibility: boolean = false;

  suggestionSelected: boolean = false;

  @Watch('value', { immediate: true })
  onValueChange(value: string): void {
    this.inputValue = value;
  }

  @Watch('inputValue', { immediate: true })
  onInputValueChange(value: string): void {
    if (!value) {
      this.suggestionSelected = false;
    }
  }

  @Watch('popperVisibility')
  onPopperVisibilityChange(value: boolean): void {
    if (value) {
      this.onDropdownShow();
    } else {
      this.onDropdownHide();
    }
  }

  @Watch('dropdownProps')
  onDropdownPropsChange(): void {
    this.mergeDropdownProps();
  }

  beforeMount(): void {
    this.mergeDropdownProps();
  }

  mergeDropdownProps(): void {
    merge(this.extendedDropdownProps, this.dropdownProps);
    this.extendedDropdownProps.popperClass = [
      'st-autocomplete-dropdown',
      this.extendedDropdownProps.popperClass,
    ].join(' ');
  }

  mounted(): void {
    this.debounceGetSuggestions = debounce(
      (query: string) => { this.getSuggestions(query); },
      this.fetchSuggestionsDelay,
    );
  }

  checkQueryConditions(query: string): boolean {
    return query.length >= this.queryMinLength;
  }

  togglePopperVisibility(value: boolean): void {
    this.popperVisibility = value;
  }

  getSuggestions(query: string): void {
    if (!this.checkQueryConditions(query)) {
      this.togglePopperVisibility(false);
      return;
    }
    this.searchLoading = true;
    this.suggestions = [];
    this.togglePopperVisibility(true);
    this.fetchSuggestions(query, (suggestions: Suggestion[]) => {
      this.searchLoading = false;
      this.suggestions = suggestions;
    });
  }

  handleInput(value: string): void {
    this.debounceGetSuggestions(value);
    this.$emit('type', value);
  }

  handleFocus(): void {
    if (this.fetchOnFocus && !this.readonly) {
      this.debounceGetSuggestions(this.inputValue);
    }
    this.$emit('focus');
  }

  handleBlur(): void {
    this.$emit('blur');
  }

  onDropdownShow(): void {
    this.$emit('dropdown-show');
  }

  onDropdownHide(): void {
    this.$emit('dropdown-hide');
    this.checkSelectedSuggestion();
  }

  handleClear(): void {
    if (!this.checkQueryConditions(this.inputValue) || this.closeOnClear) {
      this.togglePopperVisibility(false);
    }
    this.suggestions = [];
    this.$emit('input', '');
    this.$emit('clear');
  }

  checkSelectedSuggestion() {
    if (!this.suggestionSelected || this.inputValue !== this.value) {
      this.inputValue = this.suggestionSelected ? this.value : '';
    }
  }

  selectSuggestion(suggestion: Suggestion): void {
    if (this.closeOnSelect) {
      this.togglePopperVisibility(false);
    }
    this.suggestionSelected = true;
    this.$emit('input', suggestion);
    this.$emit('select', suggestion);
  }

  openDropdown(): void {
    (this.$refs.dropdown as StDropdownScript).open();
    this.togglePopperVisibility(true);
  }

  closeDropdown(): void {
    (this.$refs.dropdown as StDropdownScript).close();
    this.togglePopperVisibility(false);
  }

  onDocClick() {
    this.togglePopperVisibility(false);
  }

  focus(): void {
    (this.$refs.input as StInput).focus();
  }

  blur(): void {
    (this.$refs.input as StInput).blur();
  }
}
