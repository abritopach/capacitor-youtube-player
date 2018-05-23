declare global {
  interface PluginRegistry {
    EchoTest?: EchoPlugin;
  }
}

export interface EchoPlugin {
  echo(options: { value: string }): Promise<{value: string}>;
}
