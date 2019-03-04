/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';


import {
  maybeLoadTinyMcerPicker,
  openTinyMceLinkEditor,
} from './LinkPicker.js';

class UrlPickerField extends Component {
  resetFieldValues = (e) => {
    e.preventDefault();
    const {field, id} = this.props;

    this.props.onChange(id, {
      url: '',
      anchor: '',
      blank: '',
    });
  }

  openUrlPicker = ( e ) => {
      const target = e.currentTarget;
      const {field, id} = this.props;

      maybeLoadTinyMcerPicker()
        .then(() => openTinyMceLinkEditor(target, field))
        .then(data => this.props.onChange(id, { ...data }) );

      return false;
  }


  getButton = () => {
    const {value}  = this.props.field;

    if( value.url.length > 0) {
      return  (
      <span
        className="carbon-fields--urlpicker"
        data-is-blank={value.blank ? 1 : 0}>
        <span onClick={this.openUrlPicker.bind(this)}>
          <strong>{value.url.replace(`${carbonFieldsUrlpickerL10n.home_url}`, '')}</strong>
          <br />
          <small><em>{value.anchor}</em></small>
        </span>

        <span
          className="carbon-fields--urlpicker__remove"
          onClick={this.resetFieldValues.bind(this)}
          title={carbonFieldsUrlpickerL10n.remove_link}>
          &times;
        </span>
      </span>
    );
    }

   return (
      <span className="button button-secondary" onClick={this.openUrlPicker.bind(this)}>
        {carbonFieldsUrlpickerL10n.select_link}
      </span>
    )
  }
  /**
   * Render a number input field.
   *
   * @return {Object}
   */
  render() {
    const {
      id,
      name,
      value,
      field
    } = this.props;

    return  (
      <div>
      {this.getButton()}

      <input
        name={`${name}[url]`}
        value={value.url}
        type="hidden"
        readOnly
      />

      <input
        name={`${name}[anchor]`}
        value={value.anchor}
        type="hidden"
        readOnly
      />

      <input
        name={`${name}[blank]`}
        value={value.blank}
        type="hidden"
        readOnly
      />
      </div>
    );
  }
}

export default UrlPickerField;
