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
 * RoleTemplate is the Schema for the roletemplates API
 */
export interface RoleTemplate {
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
   * RoleTemplateSpec defines the desired state of RoleTemplate
   */
  spec?: {
    kindType?: string;
    resources?: {
      category?: string;
      displayName?: string;
      rules?: {
        /**
         * APIGroups is the name of the APIGroup that contains the resources.  If multiple API groups are specified, any action requested against one of the enumerated resources in any API group will be allowed.
         */
        apiGroups?: string[];
        /**
         * NonResourceURLs is a set of partial urls that a user should have access to.  *s are allowed, but only as the full, final step in the path Since non-resource URLs are not namespaced, this field is only applicable for ClusterRoles referenced from a ClusterRoleBinding. Rules can either apply to API resources (such as "pods" or "secrets") or non-resource URL paths (such as "/api"),  but not both.
         */
        nonResourceURLs?: string[];
        /**
         * ResourceNames is an optional white list of names that the rule applies to.  An empty set means that everything is allowed.
         */
        resourceNames?: string[];
        /**
         * Resources is a list of resources this rule applies to. '*' represents all resources.
         */
        resources?: string[];
        /**
         * Verbs is a list of Verbs that apply to ALL the ResourceKinds contained in this rule. '*' represents all verbs.
         */
        verbs: string[];
        [k: string]: any;
      }[];
      [k: string]: any;
    }[];
    [k: string]: any;
  };
  /**
   * RoleTemplateStatus defines the observed state of RoleTemplate
   */
  status?: {
    [k: string]: any;
  };
  [k: string]: any;
}