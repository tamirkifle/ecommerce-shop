import { useReactiveVar } from "@apollo/client";
import { ComponentType } from "react";
import globalStore from "../store";
import { GlobalStoreType } from "../store/types";

export interface WithStoreProps {
  storeVar: GlobalStoreType;
}

export const withStore = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: Omit<P, keyof WithStoreProps>) => {
    const storeVar = useReactiveVar(globalStore);
    return <WrappedComponent storeVar={storeVar} {...(props as P)} />;
  };
};
