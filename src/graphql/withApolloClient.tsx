import { ApolloClient, ApolloConsumer } from "@apollo/client";
import { ComponentType } from "react";

export interface WithClientProps {
  client: ApolloClient<object>;
}

export const withClient = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: Omit<P, keyof WithClientProps>) => (
    <ApolloConsumer>
      {(client) => {
        return <WrappedComponent client={client} {...(props as P)} />;
      }}
    </ApolloConsumer>
  );
};
