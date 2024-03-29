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
} from '../interfaces';
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
export class Service {
  constructor(private readonly k8sApi: K8s.CoreV1Api) {}

  kind = 'Service';
  name = 'services';
  namespaced = true;
  version = 'v1';

  /**
   * 创建 Service
   *
   * @param {string} namespace 命名空间
   * @param {K8s.V1Service} body Service 对象
   * @param {CreateOptions} [options] 可选配置项
   */
  create(namespace: string, body: K8s.V1Service, options?: CreateOptions) {
    const { pretty, dryRun, fieldManager, fieldValidation, headers } =
      options || {};
    return this.k8sApi.createNamespacedService(
      namespace,
      body,
      pretty,
      dryRun,
      fieldManager,
      fieldValidation,
      { headers },
    );
  }

  /**
   * 替换指定的 Service
   *
   * @param {string} name Service 名称
   * @param {string} namespace 命名空间
   * @param {K8s.V1Service} body Service 对象
   * @param {CreateOptions} [options] 可选配置项
   */
  replace(
    name: string,
    namespace: string,
    body: K8s.V1Service,
    options?: CreateOptions,
  ) {
    const { pretty, dryRun, fieldManager, fieldValidation, headers } =
      options || {};
    return this.k8sApi.replaceNamespacedService(
      name,
      namespace,
      body,
      pretty,
      dryRun,
      fieldManager,
      fieldValidation,
      { headers },
    );
  }

  /**
   * 部分更新指定的 Service (JSON Patch)
   *
   * @param {string} name Service 名称
   * @param {string} namespace 命名空间
   * @param {JsonPatchOp[]} body Service 对象
   * @param {PatchOptions} [options] 可选配置项
   */
  patch(
    name: string,
    namespace: string,
    body: JsonPatchOp[],
    options?: PatchOptions,
  ) {
    const { pretty, dryRun, fieldManager, fieldValidation, force, headers } =
      options || {};
    return this.k8sApi.patchNamespacedService(
      name,
      namespace,
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
   * 部分更新指定的 Service (Merge Patch)
   *
   * @param {string} name Service 名称
   * @param {string} namespace 命名空间
   * @param {object} body Service 对象
   * @param {PatchOptions} [options] 可选配置项
   */
  patchMerge(
    name: string,
    namespace: string,
    body: object,
    options?: PatchOptions,
  ) {
    const { pretty, dryRun, fieldManager, fieldValidation, force, headers } =
      options || {};
    return this.k8sApi.patchNamespacedService(
      name,
      namespace,
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
   * 部分更新指定的 Service (Strategic Merge Patch)
   *
   * @param {string} name Service 名称
   * @param {string} namespace 命名空间
   * @param {object} body Service 对象
   * @param {PatchOptions} [options] 可选配置项
   */
  patchStrategicMerge(
    name: string,
    namespace: string,
    body: object,
    options?: PatchOptions,
  ) {
    const { pretty, dryRun, fieldManager, fieldValidation, force, headers } =
      options || {};
    return this.k8sApi.patchNamespacedService(
      name,
      namespace,
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
   * 根据名称删除一个 Service
   *
   * @param {string} name Service 名称
   * @param {string} namespace 命名空间
   * @param {DeleteOptions} [options] 可选配置项
   */
  delete(name: string, namespace: string, options?: DeleteOptions) {
    const {
      pretty,
      dryRun,
      gracePeriodSeconds,
      orphanDependents,
      propagationPolicy,
      body,
      headers,
    } = options || {};
    return this.k8sApi.deleteNamespacedService(
      name,
      namespace,
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
   * 根据名称获取 Service 详情 (指定 namespace 下)
   *
   * @param {string} namespace 命名空间
   * @param {ListOptions} [options] 可选配置项
   */
  read(name: string, namespace: string, options?: ReadOptions) {
    const { pretty, headers } = options || {};
    return this.k8sApi.readNamespacedService(name, namespace, pretty, {
      headers,
    });
  }

  /**
   * 列取 Service 列表
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
      sendInitialEvents,
      timeoutSeconds,
      watch,
      headers,
    } = options || {};
    return this.k8sApi.listNamespacedService(
      namespace,
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

  /**
   * 列取 Service 列表 (所有 namespace 下)
   *
   * @param {ListOptions} [options] 可选配置项
   */
  listAll(options?: ListOptions) {
    const {
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      sendInitialEvents,
      timeoutSeconds,
      watch,
      headers,
    } = options || {};
    return this.k8sApi.listServiceForAllNamespaces(
      allowWatchBookmarks,
      _continue,
      fieldSelector,
      labelSelector,
      limit,
      pretty,
      resourceVersion,
      resourceVersionMatch,
      sendInitialEvents,
      timeoutSeconds,
      watch,
      { headers },
    );
  }
}
