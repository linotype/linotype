declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
  export default component;
}

declare module '*.yaml' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
	const value: Record<string, any>;
	export default value;
}

declare module '*.json' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
	const value: Record<string, any>;
	export default value;
}
