import { v2, ConfigOptions } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): ConfigOptions => {
    return v2.config({
      cloud_name: 'dvvk2zgur',
      api_key: '228619663234511',
      api_secret: 'xIvjfnu-2ZqVhhwkyRiIjjWi8TI',
    });
  },
};
