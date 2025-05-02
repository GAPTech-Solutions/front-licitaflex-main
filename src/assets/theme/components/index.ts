import Button from "./button";
import { formTheme } from "./form-control";
import { formErrorTheme } from "./form-error";
import { formLabelTheme } from "./form-label";
import { inputTheme } from "./input";
import { selectTheme } from "./select";
import { switchTheme } from "./switch";
import { textareaTheme } from "./textarea";
import { modalTheme } from "./modal";
import { cardLicitaTheme } from "./card-licita";
const components = {
  Button,
  Form: formTheme,
  FormError: formErrorTheme,
  FormLabel: formLabelTheme,
  Input: inputTheme,
  Select: selectTheme,
  Switch: switchTheme,
  Textarea: textareaTheme,
  Modal: modalTheme,
  CardLicita: cardLicitaTheme
};
export default components;
