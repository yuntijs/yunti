/**
 * 由 src/kubernetes/gen/index.ts 自动生成
 * !!! 请不要修改 !!!
 */

import * as K8s from '@kubernetes/client-node';
import {
  CreateOptions,
  PatchOptions,
  JsonPatchOp,
  DeleteOptions,
  DeleteCollectionSelectors,
  DeleteCollectionOptions,
  ReadOptions,
  ListOptions,
} from '../interfaces/core';
import {
  JSON_PATCH_CONTENT_TYPE,
  MERGE_PATCH_CONTENT_TYPE,
  STRATEGIC_MERGE_PATCH_CONTENT_TYPE,
} from '../utils/constants';
import { TimeExec } from '../decorators/time-exec.decorator';

/**
 * @category core
 */
@TimeExec()
export class Namespace {
  constructor(private readonly k8sApi: K8s.CoreV1Api) {}

  kind = 'Namespace';
  name = 'namespaces';
  namespaced = false;
  version = 'v1';

  /**
   * 创建 Namespace
   *
   * @param {K8s.V1Namespace} body Namespace 对象
   * @param {CreateOptions} [options] 可选配置项
   */
  create(body: K8s.V1Namespace, options?: CreateOptions) {
    const { pretty, dryRun, fieldManager, fieldValidation, headers } =
      options || {};
    return this.k8sApi.createNamespace(
      body,
      pretty,
      dryRun,
      fieldManager,
      fieldValidation,
      {
        headers,
      },
    );
  }

  /**
   * 替换指定的 Namespace
   *
   * @param {string} name Namespace 名称
   * @param {K8s.V1Namespace} body Namespace 对象
   * @param {CreateOptions} [options] 可选配置项
   */
  replace(name: string, body: K8s.V1Namespace, options?: CreateOptions) {
    const { pretty, dryRun, fieldManager, fieldValidation, headers } =
      options || {};
    return this.k8sApi.replaceNamespace(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      fieldValidation,
      {
        headers,
      },
    );
  }

  /**
   * 部分更新指定的 Namespace (JSON Patch)
   *
   * @param {string} name Namespace 名称
   * @param {JsonPatchOp[]} body Namespace 对象
   * @param {PatchOptions} [options] 可选配置项
   */
  patch(name: string, body: JsonPatchOp[], options?: PatchOptions) {
    const { pretty, dryRun, fieldManager, fieldValidation, force, headers } =
      options || {};
    return this.k8sApi.patchNamespace(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      fieldValidation,
      force,
      {
        headers: Object.assign({}, headers, {
          'Content-Type': JSON_PATCH_CONTENT_TYPE,
        }),
      },
    );
  }

  /**
   * 部分更新指定的 Namespace (Merge Patch)
   *
   * @param {string} name Namespace 名称
   * @param {object} body Namespace 对象
   * @param {PatchOptions} [options] 可选配置项
   */
  patchMerge(name: string, body: object, options?: PatchOptions) {
    const { pretty, dryRun, fieldManager, fieldValidation, force, headers } =
      options || {};
    return this.k8sApi.patchNamespace(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      fieldValidation,
      force,
      {
        headers: Object.assign({}, headers, {
          'Content-Type': MERGE_PATCH_CONTENT_TYPE,
        }),
      },
    );
  }

  /**
   * 部分更新指定的 Namespace (Strategic Merge Patch)
   *
   * @param {string} name Namespace 名称
   * @param {object} body Namespace 对象
   * @param {PatchOptions} [options] 可选配置项
   */
  patchStrategicMerge(name: string, body: object, options?: PatchOptions) {
    const { pretty, dryRun, fieldManager, fieldValidation, force, headers } =
      options || {};
    return this.k8sApi.patchNamespace(
      name,
      body,
      pretty,
      dryRun,
      fieldManager,
      fieldValidation,
      force,
      {
        headers: Object.assign({}, headers, {
          'Content-Type': STRATEGIC_MERGE_PATCH_CONTENT_TYPE,
        }),
      },
    );
  }

  /**
   * 根据名称删除一个 Namespace
   *
   * @param {string} name Namespace 名称
   * @param {DeleteOptions} [options] 可选配置项
   */
  delete(name: string, options?: DeleteOptions) {
    const {
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      headers,
    } = options || {};
    return this.k8sApi.deleteNamespace(
      name,
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      { headers },
    );
  }

  /**
   * 根据名称获取 Namespace 详情
   *
   * @param {ListOptions} [options] 可选配置项
   */
  read(name: string, options?: ReadOptions) {
    const { pretty, headers } = options || {};
    return this.k8sApi.readNamespace(name, pretty, { headers });
  }

  /**
   * 列取 Namespace 列表
   *
   * @param {ListOptions} [options] 可选配置项
   */
  list(options?: ListOptions) {
    const {
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      sendInitialEvents,
      timeoutSeconds,
      watch,
      headers,
    } = options || {};
    return this.k8sApi.listNamespace(
      pretty,
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      resourceVersion,
      resourceVersionMatch,
      sendInitialEvents,
      timeoutSeconds,
      watch,
      { headers },
    );
  }
}
