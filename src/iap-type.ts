import { ModalProps, StyleProp, ViewStyle } from "react-native";
import { Plan } from "./types/plan";

export interface IAPProps {
  visible: boolean;
  onRestorePressed?: () => void;
  benefits: string[];
  plans: Plan[];
  privacyUrl: string;
  termsUrl: string;

  theme?: "theme1";
  style?: StyleProp<ViewStyle>;
  onBackPressed?: () => void;
  modalProps?: Partial<ModalProps>;
}
