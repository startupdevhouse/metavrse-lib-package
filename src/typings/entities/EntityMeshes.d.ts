import { RGB } from '../common/RGB';

export type EntityMeshes = {
  use_pbr?: boolean;

  albedo_ratio?: RGB;
  albedo_texture?: string;
  albedo_video?: string;

  ao_ratio?: number;
  ao_texture?: string;
  ao_texture_channel?: string;

  diffuse_ibl_ratio?: RGB;
  diffuse_ratio?: number;
  diffuse_texture?: string;

  emissive_ratio?: RGB;
  emissive_texture?: string;

  metalness_ratio?: number;
  metalness_texture?: string;
  metalness_texture_channel?: string;

  normal_ratio?: number;
  normal_texture?: string;

  opacity_ratio?: number;
  opacity_texture?: string;
  opacity_texture_channel?: string;

  roughness_ratio?: number;
  roughness_texture?: string;
  roughness_texture_channel?: string;

  specular_ibl_ratio?: RGB;
  specular_pbr_ratio?: RGB;
  specular_power?: number;
  specular_ratio?: number;
  specular_texture?: string;
};
