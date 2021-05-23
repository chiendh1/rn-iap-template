import { ModalProps, StyleProp, ViewStyle } from "react-native";
import { Plan } from "./types/plan";

export interface IAPProps {
  style?: StyleProp<ViewStyle>;
  onRestorePressed?: () => void;
  benefits: string[];
  plans: Plan[];
  visible?: boolean;
  onBackPressed?: () => void;
  modalProps?: Partial<ModalProps>;
  theme?: 'theme1'
}
