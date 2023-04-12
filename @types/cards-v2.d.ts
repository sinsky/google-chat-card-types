type Integer = number;

export default interface CardsV2 {
  cardsV2?: CardV2[];
}

interface CardV2 {
  cardId?: string;
  card?: Card;
}

/**
 * Cards support a defined layout, interactive UI elements like buttons, and rich media like images. Use cards to present detailed information, gather information from users, and guide users to take a next step.
 */
interface Card {
  header?: CardHeader;
  sections?: Section[];
  cardActions?: CardAction[];
  name?: string;
  fixedFooter?: CardFixedFooter;
  displayStyle?: DisplayStyle | keyof typeof DisplayStyle;
  peekCardHeader?: CardHeader;
}

/**
 * Represents a card header.
 */
interface CardHeader {
  title?: string;
  subtitle?: string;
  imageType?: ImageType | keyof typeof ImageType;
  imageUrl?: string;
  imageAltText?: string;
}

/**
 * The shape used to crop the image.
 */
enum ImageType {
  /**
   * Default value. Applies a square mask to the image. For example, a 4x3 image becomes 3x3.
   */
  SQUARE,
  /**
   * Applies a circular mask to the image. For example, a 4x3 image becomes a circle with a diameter of 3.
   */
  CIRCLE,
}

/**
 * A section contains a collection of widgets that are rendered vertically in the order that they are specified.
 */
interface Section {
  header?: string;
  widgets?: Widget[];
  collapsible?: boolean;
  uncollapsibleWidgetsCount?: Integer;
}

/**
 * Each card is made up of widgets.
 * A widget is a composite object that can represent one of text, images, buttons, and other object types.
 */
interface Widget {
  textParagraph?: TextParagraph;
  image?: Image;
  decoratedText?: DecoratedText;
  buttonList?: ButtonList;
  textInput?: TextInput;
  selectionInput?: SelectionInput;
  dateTimePicker?: DateTimePicker;
  divider?: Divider;
  grid?: Grid;
}

/**
 * A paragraph of text that supports formatting. See Text formatting for details.
 */
interface TextParagraph {
  text?: string;
}

/**
 * An image that is specified by a URL and can have an onClick action.
 */
interface Image {
  imageUrl?: string;
  onClick?: OnClick;
  altText?: string;
}

/**
 * Represents how to respond when users click an interactive element on a card, such as a button.
 */
interface OnClick {
  action?: Action;
  openLink?: OpenLink;
  openDynamicLinkAction?: Action;
  card?: Card;
}

/**
 * An action that describes the behavior when the form is submitted. For example, an Apps Script can be invoked to handle the form. If the action is triggered, the form values are sent to the server.
 */
interface Action {
  function?: string;
  parameters?: ActionParameter[];
  loadIndicator?: LoadIndicator | keyof typeof LoadIndicator;
  persistValues?: boolean;
  interaction?: Interaction | keyof typeof Interaction;
}

/**
 * List of string parameters to supply when the action method is invoked. For example, consider three snooze buttons?: snooze now, snooze 1 day, snooze next week. You might use action method = snooze(), passing the snooze type and snooze time in the list of string parameters.
 *
 * To learn more, see CommonEventObject .
 */
interface ActionParameter {
  key?: string;
  value?: string;
}

/**
 * Specifies the loading indicator that the action displays while making the call to the action.
 */
enum LoadIndicator {
  /**
   * Displays a spinner to indicate that content is loading.
   */
  SPINNER,
  /**
   * Nothing is displayed.
   */
  NONE,
}

/**
 * Optional. Required when opening a dialog .
 * What to do in response to an interaction with a user, such as a user clicking button on a card message.
 * If unspecified, the app responds by executing an action - like opening a link or running a function - as normal.
 * By specifying an interaction , the app can respond in special interactive ways. For example, by setting interaction to OPEN_DIALOG , the app can open a dialog .
 * When specified, a loading indicator is not shown.
 * Supported by Chat apps, but not Google Workspace Add-ons. If specified for an add-on, the entire card is stripped and nothing is shown in the client.
 */
enum Interaction {
  /**
   * Default value. The action executes as normal.
   */
  INTERACTION_UNSPECIFIED,
  /**
   * Opens a dialog , a windowed, card-based interface that Chat apps use to interact with users.
   * Only supported by Chat apps in response to button-clicks on card messages.
   * Not supported by Google Workspace Add-ons. If specified for an add-on, the entire card is stripped and nothing is shown in the client.
   */
  OPEN_DIALOG,
}

/**
 * Represents an onClick event that opens a hyperlink.
 */
interface OpenLink {
  url?: string;
  openAs?: OpenAs | keyof typeof OpenAs;
  onClose?: OnClose | keyof typeof OnClose;
}

/**
 * When an OnClick opens a link, then the client can either open it as a full size window (if that is the frame used by the client), or an overlay (such as a pop-up). The implementation depends on the client platform capabilities, and the value selected might be ignored if the client doesn't support it. FULL_SIZE is supported by all clients.
 * Supported by Google Workspace Add-ons, but not Chat apps.
 */
enum OpenAs {
  /**
   * The link opens as a full size window (if that's the frame used by the client.
   */
  FULL_SIZE,
  /**
   * The link opens as an overlay, such as a pop-up.
   */
  OVERLAY,
}

/**
 * What the client does when a link opened by an OnClick action gets closed.
 * Implementation depends on client platform capabilities. For example, a web browser might open a link in a pop-up window with an OnClose handler.
 * If both OnOpen and OnClose handlers are set, and the client platform can't support both values, OnClose takes precedence.
 * Supported by Google Workspace Add-ons, but not Chat apps.
 */
enum OnClose {
  /**
   * Default value. The card does not reload; nothing happens.
   */
  NOTHING,
  /**
   * Reloads the card after the child window closes.
   * If used in conjunction with OpenAs.OVERLAY , the child window acts as a modal dialog and the parent card is blocked until the child window closes.
   */
  RELOAD,
}

/**
 * A widget that displays text with optional decorations such as a label above or below the text, an icon in front of the text, a selection widget or a button after the text.
 */
interface DecoratedText {
  icon?: Icon;
  startIcon?: Icon;
  topLabel?: string;
  text?: string;
  wrapText?: boolean;
  bottomLabel?: string;
  onClick?: OnClick;
  // Union field control can be only one of the following:
  button?: Button;
  switchControl?: SwitchControl;
  endIcon?: Icon;
  // End of list of possible types for union field control.
}

/**
 * An icon displayed in a widget on a card.
 * Supports built-in and custom icons.
 */
interface Icon {
  altText?: string;
  imageType?: ImageType | keyof typeof ImageType;
  knownIcon?: string;
  iconUrl?: string;
}

/**
 * A text, icon, or text + icon button that users can click.
 * To make an image a clickable button, specify an Image (not an ImageComponent ) and set an onClick action.
 * Currently supported in Chat apps (including dialogs and card messages ) and Google Workspace Add-ons.
 */
interface Button {
  text?: string;
  icon?: Icon;
  color?: Color;
  onClick?: OnClick;
  disabled?: boolean;
  altText?: string;
}

/**
 * Represents a color in the RGBA color space. This representation is designed for simplicity of conversion to/from color representations in various languages over compactness. For example, the fields of this representation can be trivially provided to the constructor of java.awt.Color in Java; it can also be trivially provided to UIColor's +colorWithRed:green:blue:alpha method in iOS; and, with just a little work, it can be easily formatted into a CSS rgba() string in JavaScript.
 * This reference page doesn't carry information about the absolute color space that should be used to interpret the RGB value (e.g. sRGB, Adobe RGB, DCI-P3, BT.2020, etc.). By default, applications should assume the sRGB color space.
 * When color equality needs to be decided, implementations, unless documented otherwise, treat two colors as equal if all their red, green, blue, and alpha values each differ by at most 1e-5.
 */
interface Color {
  red?: number;
  green?: number;
  blue?: number;
  alpha?: number;
}

/**
 * Either a toggle-style switch or a checkbox inside a decoratedText widget.
 * Only supported on the decoratedText widget.
 */
interface SwitchControl {
  name?: string;
  value?: string;
  selected?: boolean;
  onChangeAction?: Action;
  controlType?: ControlType | keyof typeof ControlType;
}

/**
 * How the switch appears in the user interface.
 */
enum ControlType {
  /**
   * A toggle-style switch.
   */
  SWITCH,
  /**
   * Deprecated in favor of CHECK_BOX .
   * @deprecated Use CHECK_BOX instead.
   */
  CHECKBOX,
  /**
   * A checkbox.
   */
  CHECK_BOX,
}

/**
 * A list of buttons layed out horizontally.
 */
interface ButtonList {
  buttons?: Button[];
}

/**
 * A field in which users can enter text. Supports suggestions and on-change actions.
 * Chat apps receive and can process the value of entered text during form input events. For details about working with form inputs, see Receive form data .
 * When you need to collect abstract data from users, use a text input. To collect defined data from users, use the selection input widget instead.
 */
interface TextInput {
  name?: string;
  label?: string;
  hintText?: string;
  value?: string;
  type?: Type | keyof typeof Type;
  onChangeAction?: Action;
  initialSuggestions?: Suggestions;
  autoCompleteAction?: Action;
}

/**
 * How a text input field appears in the user interface. For example, whether it is a single line input field, or a multi-line input.
 * If initialSuggestions is specified, type is always SINGLE_LINE , even if it is set to MULTIPLE_LINE .
 */
enum Type {
  /**
   * The text input field has a fixed height of one line.
   */
  SINGLE_LINE,
  /**
   * The text input field has a fixed height of multiple lines.
   */
  MULTIPLE_LINE,
}

/**
 * Suggested values that users can enter. These values appear when users click inside the text input field. As users type, the suggested values dynamically filter to match what the users have typed.
 * For example, a text input field for programming language might suggest Java, JavaScript, Python, and C++. When users start typing "Jav", the list of suggestions filters to show just Java and JavaScript.
 * Suggested values help guide users to enter values that your app can make sense of. When referring to JavaScript, some users might enter "javascript" and others "java script". Suggesting "JavaScript" can standardize how users interact with your app.
 * When specified, TextInput.type is always SINGLE_LINE , even if it is set to MULTIPLE_LINE .
 */
interface Suggestions {
  items?: SuggestionItem[];
}

/**
 * One suggested value that users can enter in a text input field.
 */
interface SuggestionItem {
  // Union field content can be only one of the following:
  text?: string;
  // End of list of possible types for union field content.
}

/**
 * A widget that creates a UI item with options for users to select. For example, a dropdown menu or check list.
 * Chat apps receive and can process the value of entered text during form input events. For details about working with form inputs, see Receive form data .
 * When you need to collect data from users that matches options you set, use a selection input. To collect abstract data from users, use the text input widget instead.
 */
interface SelectionInput {
  name?: string;
  label?: string;
  type?: SelectionType | keyof typeof SelectionType;
  items?: SelectionItem[];
  onChangeAction?: Action;
}

/**
 * The way that an option appears to users. Different options support different types of interactions. For example, users can enable multiple check boxes, but can only select one value from a dropdown menu.
 * Each selection input supports one type of selection. Mixing check boxes and switches, for example, is not supported.
 */
enum SelectionType {
  /**
   * A set of checkboxes. Users can select multiple check boxes per selection input.
   */
  CHECK_BOX,
  /**
   * A set of radio buttons. Users can select one radio button per selection input.
   */
  RADIO_BUTTON,
  /**
   * A set of switches. Users can turn on multiple switches at once per selection input.
   */
  SWITCH,
  /**
   * A dropdown menu. Users can select one dropdown menu item per selection input.
   */
  DROPDOWN,
}

/**
 * A selectable item in a selection input, such as a check box or a switch.
 */
interface SelectionItem {
  text?: string;
  value?: string;
  selected?: boolean;
}

/**
 * Lets users specify a date, a time, or both a date and a time.
 * Accepts text input from users, but features an interactive date and time selector that helps users enter correctly-formatted dates and times. If users enter a date or time incorrectly, the widget shows an error that prompts users to enter the correct format.
 * Not supported by Chat apps. Support by Chat apps coming soon.
 */
interface DateTimePicker {
  name?: string;
  label?: string;
  type?: DateTimePickerType | keyof typeof DateTimePickerType;
  valueMsEpoch?: string;
  timezoneOffsetDate?: Integer;
  onChangeAction?: Action;
}

/**
 * What kind of date and time input the datetime picker supports.
 */
enum DateTimePickerType {
  /**
   * The user can select a date and time.
   */
  DATE_AND_TIME,
  /**
   * The user can only select a date.
   */
  DATE_ONLY,
  /**
   * The user can only select a time.
   */
  TIME_ONLY,
}

/**
 * Displays a divider between widgets, a horizontal line.
 * For example, the following JSON creates a divider:
 */
interface Divider {}

/**
 * Displays a grid with a collection of items.
 * A grid supports any number of columns and items. The number of rows is determined by items divided by columns. A grid with 10 items and 2 columns has 5 rows. A grid with 11 items and 2 columns has 6 rows.
 * For example, the following JSON creates a 2 column grid with a single item:
 */
interface Grid {
  title?: string;
  items?: GridItem[];
  borderStyle?: BorderStyle;
  columnCount?: Integer;
  onClick?: OnClick;
}

/**
 * Represents a single item in the grid layout.
 */
interface GridItem {
  id?: string;
  image?: ImageComponent;
  title?: string;
  subtitle?: string;
  layout?: GridItemLayout | keyof typeof GridItemLayout;
}

/**
 * Represents an image.
 */
interface ImageComponent {
  imageUri?: string;
  altText?: string;
  cropStyle?: ImageCropStyle;
  borderStyle?: BorderStyle;
}

/**
 * Represents the crop style applied to an image.
 */
interface ImageCropStyle {
  type?: ImageCropType | keyof typeof ImageCropType;
  aspectRatio?: number;
}

/**
 * Represents the crop style applied to an image.
 */
enum ImageCropType {
  /**
   * No value specified. Do not use.
   */
  IMAGE_CROP_TYPE_UNSPECIFIED,
  /**
   * Default value. Applies a square crop.
   */
  SQUARE,
  /**
   * Applies a circular crop.
   */
  CIRCLE,
  /**
   * Applies a rectangular crop with a custom aspect ratio. Set the custom aspect ratio with aspectRatio .
   */
  RECTANGLE_CUSTOM,
  /**
   * Applies a rectangular crop with a 4:3 aspect ratio.
   */
  RECTANGLE_4_3,
}

/**
 * The style options for the border of a card or widget, including the border type and color.
 */
interface BorderStyle {
  type?: BorderType | keyof typeof BorderType;
  strokeColor?: Color;
  cornerRadius?: Integer;
}

/**
 * Represents the border types applied to widgets.
 */
enum BorderType {
  /**
   * No value specified.
   */
  BORDER_TYPE_UNSPECIFIED,
  /**
   * Default value. No border.
   */
  NO_BORDER,
  /**
   * Outline.
   */
  STROKE,
}

/**
 * Represents the various layout options available for a grid item.
 */
enum GridItemLayout {
  /**
   * No layout specified.
   */
  GRID_ITEM_LAYOUT_UNSPECIFIED,
  /**
   * The title and subtitle are shown below the grid item's image.
   */
  TEXT_BELOW,
  /**
   * The title and subtitle are shown above the grid item's image.
   */
  TEXT_ABOVE,
}

/**
 * A card action is the action associated with the card. For example, an invoice card might include actions such as delete invoice, email invoice, or open the invoice in a browser.
 * Not supported by Chat apps.
 */
interface CardAction {
  actionLabel?: string;
  onClick?: OnClick;
}

/**
 * A persistent (sticky) footer that that appears at the bottom of the card.
 * Setting fixedFooter without specifying a primaryButton or a secondaryButton causes an error.
 * Chat apps support fixedFooter in dialogs , but not in card messages .
 */
interface CardFixedFooter {
  primaryButton?: Button;
  secondaryButton?: Button;
}

/**
 * In Google Workspace Add-ons, determines how a card is displayed.
 * Not supported by Chat apps.
 */
enum DisplayStyle {
  /**
   * Do not use.
   * @deprecated This value should not be used. Use 'PEEK' or 'REPLACE' instead.
   */
  DISPLAY_STYLE_UNSPECIFIED,
  /**
   * The header of the card appears at the bottom of the sidebar, partially covering the current top card of the stack. Clicking the header pops the card into the card stack. If the card has no header, a generated header is used instead.
   */
  PEEK,
  /**
   * Default value. The card is shown by replacing the view of the top card in the card stack.
   */
  REPLACE,
}
