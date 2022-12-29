export const storage_model_path = (hero: string, key: string) => `models/${hero.toLowerCase()}/${key}.gltf`;

export const storage_portrait_path = (hero: string, key: string) => `portrait/${hero.toLowerCase()}/${key}.webp`;

export const signed_url_options: any = {action: 'read', expires: new Date(Date.now() + 1000 * 60 * 30)};
