const regex = {
  doubleBraces: /{{([^}]+)}}/g,
  if: /{@if ([^}]+)}([\s\S]*?)(?:{else}([\s\S]*?))?{\/if}/g,
  each: /{@each ([^}]+)}([\s\S]*?){\/each}/g
};

type FetchValueWithKey = (key: string, data: Record<string, any>) => unknown;
const fetchValueWithKey: FetchValueWithKey = (key, data = {}) => {
  let value = data;
  for (const property of key.split('.')) {
    value = value ? value[property] : undefined;
  }

  return Array.isArray(value) ? value : String(value);
};

const render = (template: string, data: Record<string, any>): string => {
  return template
    .replace(regex.each, (_, array, content) => {
      const match = /(\w+)\s+in\s+([\w+\.]+)/.exec(array.trim());
      if (!match) {
        return '';
      }
      const [, item, iterable] = match;

      if (!item || !iterable) {
        return '';
      }

      const iterableItems = fetchValueWithKey(iterable, data);

      return (iterableItems as any[])
        .map((value: any) => {
          return render(content, { ...data, [item]: value });
        })
        .join('');
    })
    .replace(regex.if, (_, condition, trueContent = '', falseContent = '') => {
      let content = '';
      if (fetchValueWithKey(condition.trim(), data)) {
        content = trueContent;
      } else {
        content = falseContent;
      }

      return render(content, data);
    })
    .replace(regex.doubleBraces, (_, key) =>
      String(fetchValueWithKey(key.trim(), data) as unknown)
    );
};

const muffin = {
  render
};

export default muffin;
