import React from 'react';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>;
  children: React.ReactNode;
}

export default function WithCompose(props: Props) {
  const { components = [], children } = props;

  return (
    <>
      {components.reduceRight(
        (acc, Comp) => (
          <Comp>{acc}</Comp>
        ),
        children,
      )}
    </>
  );
}
