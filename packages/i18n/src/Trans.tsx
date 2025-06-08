import { cloneElement, type ReactElement, type ReactNode } from "react";

import type { DotPaths, PathsWithParams, Params } from "@/lib";
import { t, type ValidPrefixes } from "@/utils";

type TransProps<TKey extends DotPaths> = {
  tKey: TKey;
  components?: ReactElement[];
} & (TKey extends PathsWithParams
  ? { values: Params<TKey> }
  : { values?: never });

function renderTranslatedContent(
  translation: string,
  components: ReactElement[] = [],
) {
  const componentMap = new Map<string, ReactElement>();
  components.forEach((component, index) => {
    componentMap.set(index.toString(), component);
    const props = component.props as { id?: string };
    if (props.id) {
      componentMap.set(props.id, component);
    }
  });

  const parts = translation.split(/(<(\d+)>|<\/(\d+)>|<(\d+)\s*\/>)/);

  const result = parts.reduce(
    (acc, part, index) => {
      const stackParent = acc.stack[acc.stack.length - 1];

      if (index % 5 === 0) {
        // Text
        if (part) {
          if (stackParent) {
            stackParent.children.push(part);
          } else {
            acc.nodes.push(part);
          }
        }
      } else if (index % 5 === 2) {
        // Opening Tag: <0>
        const component = componentMap.get(part);
        if (component != null) {
          acc.stack.push({ element: component, children: [] });
        }
      } else if (index % 5 === 3) {
        // Closing Tag: </0>
        if (part) {
          const item = acc.stack.pop();
          if (item) {
            const newElement = cloneElement(
              item.element,
              { key: index },
              ...item.children,
            );
            const newParent = acc.stack[acc.stack.length - 1];
            if (newParent) {
              newParent.children.push(newElement);
            } else {
              acc.nodes.push(newElement);
            }
          }
        }
      } else if (index % 5 === 4) {
        // Self-Closing Tag: <0/>
        const component = componentMap.get(part);
        if (component != null) {
          const newElement = cloneElement(component, { key: index });
          if (stackParent) {
            stackParent.children.push(newElement);
          } else {
            acc.nodes.push(newElement);
          }
        }
      }

      return acc;
    },
    {
      stack: [] as { element: ReactElement; children: ReactNode[] }[],
      nodes: [] as ReactNode[],
    },
  );

  return <>{result.nodes}</>;
}

export function Trans<TKey extends DotPaths>({
  tKey,
  values,
  components = [],
}: TransProps<TKey>) {
  const translation = t(tKey, ...(values != null ? ([values] as any) : []));

  return renderTranslatedContent(translation, components);
}

type PrefixedKey<P extends ValidPrefixes, K extends string> = `${P}.${K}`;

type IsPrefixedKeyValid<P extends ValidPrefixes, K extends string> =
  PrefixedKey<P, K> extends DotPaths ? true : false;

type TransWithPrefixProps<
  P extends ValidPrefixes,
  K extends string,
  Valid = IsPrefixedKeyValid<P, K>,
> = {
  prefix: P;
  tKey: K;
  components?: ReactElement[];
} & (Valid extends true
  ? PrefixedKey<P, K> extends PathsWithParams
    ? { values: Params<PrefixedKey<P, K>> }
    : { values?: never }
  : { values?: never });

export function TransWithPrefix<P extends ValidPrefixes, K extends string>({
  prefix,
  tKey,
  values,
  components = [],
}: TransWithPrefixProps<P, K>): ReactNode {
  const fullKey = `${prefix}.${tKey}` as PrefixedKey<P, K> & DotPaths;

  const translation = t(
    fullKey,
    // @ts-expect-error - We need to handle both cases with and without values
    values != null ? values : undefined,
  );

  return renderTranslatedContent(translation, components);
}
