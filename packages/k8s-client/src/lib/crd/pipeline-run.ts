/**
 * 由 src/kubernetes/gen/index.ts 自动生成
 * !!! 请不要修改 !!!
 */

import http from 'http';
import * as K8s from '@kubernetes/client-node';
import {
  CreateOptions,
  PatchOptions,
  JsonPatchOp,
  DeleteOptions,
  DeleteCollectionOptions,
  ReadOptions,
  ListOptions,
  CRD,
} from '../interfaces';
import {
  JSON_PATCH_CONTENT_TYPE,
  MERGE_PATCH_CONTENT_TYPE,
  STRATEGIC_MERGE_PATCH_CONTENT_TYPE,
} from '../utils/constants';
import { TimeExec } from '../decorators/time-exec.decorator';

export const PIPELINE_RUN_CRD_SPEC = {
  kind: 'PipelineRun',
  listKind: 'PipelineRunList',
  plural: 'pipelineruns',
  singular: 'pipelinerun',
  scope: 'Namespaced',
  group: 'tekton.dev',
  version: 'v1beta1',
};

const { kind, group, version, plural } = PIPELINE_RUN_CRD_SPEC;
const DEFAULT_BODY = {
  kind,
  apiVersion: `${group}/${version}`,
};

/**
 * @category crd
 */
@TimeExec()
export class PipelineRun {
  constructor(private readonly k8sApi: K8s.CustomObjectsApi) {}

  kind = kind;
  name = plural;
  namespaced = true;
  group = group;
  version = version;

  /**
   * 创建 PipelineRun
   *
   * @param {string} namespace 命名空间
   * @param {CRD.PipelineRun} body PipelineRun 对象
   * @param {CreateOptions} [options] 可选配置项
   */
  create(namespace: string, body: CRD.PipelineRun, options?: CreateOptions) {
    const { pretty, dryRun, fieldManager, headers } = options || {};
    return this.k8sApi.createNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      Object.assign({}, DEFAULT_BODY, body),
      pretty,
      dryRun,
      fieldManager,
      { headers },
    ) as Promise<{
      response: http.IncomingMessage;
      body: CRD.PipelineRun;
    }>;
  }

  /**
   * 替换指定的 PipelineRun
   *
   * @param {string} name PipelineRun 名称
   * @param {string} namespace 命名空间
   * @param {CRD.PipelineRun} body PipelineRun 对象
   * @param {CreateOptions} [options] 可选配置项
   */
  replace(
    name: string,
    namespace: string,
    body: CRD.PipelineRun,
    options?: CreateOptions,
  ) {
    const { dryRun, fieldManager, headers } = options || {};
    return this.k8sApi.replaceNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      name,
      Object.assign({}, DEFAULT_BODY, body),
      dryRun,
      fieldManager,
      { headers },
    ) as Promise<{
      response: http.IncomingMessage;
      body: CRD.PipelineRun;
    }>;
  }

  /**
   * 部分更新指定的 PipelineRun (JSON Patch)
   *
   * @param {string} name PipelineRun 名称
   * @param {string} namespace 命名空间
   * @param {JsonPatchOp[]} body PipelineRun 对象
   * @param {PatchOptions} [options] 可选配置项
   */
  patch(
    name: string,
    namespace: string,
    body: JsonPatchOp[],
    options?: PatchOptions,
  ) {
    const { dryRun, fieldManager, force, headers } = options || {};
    return this.k8sApi.patchNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      name,
      body,
      dryRun,
      fieldManager,
      force,
      {
        headers: Object.assign({}, headers, {
          'Content-Type': JSON_PATCH_CONTENT_TYPE,
        }),
      },
    ) as Promise<{
      response: http.IncomingMessage;
      body: CRD.PipelineRun;
    }>;
  }

  /**
   * 部分更新指定的 PipelineRun (Merge Patch)
   *
   * @param {string} name PipelineRun 名称
   * @param {string} namespace 命名空间
   * @param {object} body PipelineRun 对象
   * @param {PatchOptions} [options] 可选配置项
   */
  patchMerge(
    name: string,
    namespace: string,
    body: object,
    options?: PatchOptions,
  ) {
    const { dryRun, fieldManager, force, headers } = options || {};
    return this.k8sApi.patchNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      name,
      body,
      dryRun,
      fieldManager,
      force,
      {
        headers: Object.assign({}, headers, {
          'Content-Type': MERGE_PATCH_CONTENT_TYPE,
        }),
      },
    ) as Promise<{
      response: http.IncomingMessage;
      body: CRD.PipelineRun;
    }>;
  }

  /**
   * 部分更新指定的 PipelineRun (Strategic Merge Patch)
   *
   * @param {string} name PipelineRun 名称
   * @param {string} namespace 命名空间
   * @param {object} body PipelineRun 对象
   * @param {PatchOptions} [options] 可选配置项
   */
  patchStrategicMerge(
    name: string,
    namespace: string,
    body: object,
    options?: PatchOptions,
  ) {
    const { dryRun, fieldManager, force, headers } = options || {};
    return this.k8sApi.patchNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      name,
      body,
      dryRun,
      fieldManager,
      force,
      {
        headers: Object.assign({}, headers, {
          'Content-Type': STRATEGIC_MERGE_PATCH_CONTENT_TYPE,
        }),
      },
    ) as Promise<{
      response: http.IncomingMessage;
      body: CRD.PipelineRun;
    }>;
  }

  /**
   * 根据名称删除一个  PipelineRun
   *
   * @param {string} name PipelineRun 名称
   * @param {string} namespace 命名空间
   * @param {DeleteOptions} [options] 可选配置项
   */
  delete(name: string, namespace: string, options?: DeleteOptions) {
    const {
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      headers,
    } = options || {};
    return this.k8sApi.deleteNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      name,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      dryRun,
      body,
      { headers },
    ) as Promise<{
      response: http.IncomingMessage;
      body: CRD.PipelineRun;
    }>;
  }

  /**
   * 根据选择器删除多个 PipelineRun
   *
   * @param {string} namespace 命名空间
   * @param {DeleteCollectionOptions} [options] 可选配置项
   */
  deleteCollection(namespace: string, options?: DeleteCollectionOptions) {
    const {
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      headers,
    } = options || {};
    return this.k8sApi.deleteCollectionNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      pretty,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      dryRun,
      body,
      { headers },
    ) as Promise<{
      response: http.IncomingMessage;
      body: K8s.V1Status;
    }>;
  }

  /**
   * 根据名称获取 PipelineRun 详情 (指定 namespace 下)
   *
   * @param {string} name PipelineRun 名称
   * @param {string} namespace 命名空间
   * @param {ListOptions} [options] 可选配置项
   */
  read(name: string, namespace: string, options?: ReadOptions) {
    const { headers } = options || {};
    return this.k8sApi.getNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      name,
      { headers },
    ) as Promise<{
      response: http.IncomingMessage;
      body: CRD.PipelineRun;
    }>;
  }

  /**
   * 列取 PipelineRun 列表
   *
   * @param {string} namespace 命名空间
   * @param {ListOptions} [options] 可选配置项
   */
  list(namespace: string, options?: ListOptions) {
    const {
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      headers,
    } = options || {};
    return this.k8sApi.listNamespacedCustomObject(
      group,
      version,
      namespace,
      plural,
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      timeoutSeconds,
      watch,
      { headers },
    ) as Promise<{
      response: http.IncomingMessage;
      body: CRD.PipelineRunList;
    }>;
  }
}
