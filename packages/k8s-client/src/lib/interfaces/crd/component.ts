/**
 * 由 src/kubernetes/gen/index.ts 自动生成
 * !!! 请不要修改 !!!
 */
/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Component is the Schema for the components API
 */
export interface Component {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: string;
  metadata?: {
    [k: string]: any;
  };
  /**
   * ComponentSpec defines the desired state of Component
   */
  spec?: {
    application?: {
      helmChart?: {
        name?: string;
        valuesConfig?: string;
        version?: string;
        [k: string]: any;
      };
      name?: string;
      [k: string]: any;
    };
    menu?: {
      name?: string;
      [k: string]: any;
    };
    /**
     * the router of portal
     */
    portal?: {
      /**
       * the path of the static file
       */
      entry?: string;
      /**
       * the path for request acccessing
       */
      path?: string;
      [k: string]: any;
    };
    [k: string]: any;
  };
  /**
   * ComponentStatus defines the observed state of Component
   */
  status?: {
    [k: string]: any;
  };
  [k: string]: any;
}
