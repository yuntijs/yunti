// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Page,
  Card,
  Row,
  Col,
  Input,
  Button,
  Empty,
  Menu,
  Dropdown,
  Typography,
  Space,
  Select,
  Iframe,
  Modal,
  FormilyForm,
  FormilyInput,
  FormilyTextArea,
  FormilySelect,
  Alert,
} from '@tenx-ui/materials';

import { AntdIconPlusOutlined, AntdIconEllipsisOutlined } from '@tenx-ui/icon-materials';

import { useLocation, matchPath } from '@umijs/max';
import { DataProvider } from 'shared-components';
import qs from 'query-string';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import utils, { RefsManager } from '../../utils/__utils';

import * as __$$i18n from '../../i18n';

import __$$constants from '../../__constants';

import './index.css';

class AppDetailPages$$Page extends React.Component {
  get location() {
    return this.props.self?.location;
  }
  get match() {
    return this.props.self?.match;
  }
  get history() {
    return this.props.self?.history;
  }
  get appHelper() {
    return this.props.self?.appHelper;
  }

  _context = this;

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      createPageModalOpen: false,
      deletePageConfirmModalOpen: false,
      editPagePropsModalOpen: false,
      pageId: undefined,
    };

    this.bff = this.utils.getSdkById(this.match.params.appId);
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  closeCreatePageModal() {
    this.setState({
      createPageModalOpen: false,
    });
  }

  closeDeletePageConfirmModal() {
    this.setState({
      deletePageConfirmModalOpen: false,
    });
  }

  closeEditPagePropsModal() {
    this.setState({
      editPagePropsModalOpen: false,
    });
  }

  confirmCreatePage(e) {
    const form = this.$('create_page_form')?.formRef?.current?.form;
    form.submit(async values => {
      values.appId = this.match.params.appId;
      console.log('values', values);
      try {
        await this.bff.createPage({
          page: values,
        });
        this.closeCreatePageModal();
        this.utils.notification.success({
          message: '创建页面成功',
        });
        this.props.useGetApp.mutate();
      } catch (error) {
        this.utils.notification.warnings({
          message: '创建页面失败',
          errors: error?.response?.errors,
        });
      }
    });
  }

  async confirmDeletePage(e) {
    const page = this.getCurrentPage();
    await this.bff.deletePage({
      id: page.id,
    });
    this.closeDeletePageConfirmModal();
    this.setState({
      pageId: undefined,
    });
    this.utils.notification.success({
      message: `页面 ${page.title} 删除成功`,
    });
    this.props.useGetApp.mutate();
  }

  confirmEditPageProps(e) {
    const form = this.$('edit_page_props_form')?.formRef?.current?.form;
    form.submit(async values => {
      try {
        await this.bff.updatePage({
          page: values,
        });
        this.closeEditPagePropsModal();
        this.utils.notification.success({
          message: '编辑页面属性成功',
        });
        this.props.useGetApp.mutate();
      } catch (error) {
        this.utils.notification.warnings({
          message: '编辑页面属性失败',
          errors: error?.response?.errors,
        });
      }
    });
  }

  getBranchesOptions() {
    const options =
      this.props.useGetApp?.data?.app?.branches?.map(item => ({
        label: item.displayName,
        value: item.name,
      })) || [];
    return options;
  }

  getCurrentPage() {
    const id = this.state.pageId;
    const pages = this.props.useGetApp?.data?.app?.pages || [];
    if (!id) {
      return pages[0];
    }
    return pages.find(p => p.id === id);
  }

  getPagesOptions() {
    const pages = this.props.useGetApp?.data?.app?.pages || [];
    const options = pages.map(({ id, title }) => ({
      label: title,
      value: id,
    }));
    // console.log('options', options)
    return options;
  }

  getPreviewIframeSrc() {
    return `/preview/page?appId=${this.match.params.appId || ''}&pageId=${
      this.getCurrentPage()?.id || ''
    }`;
  }

  handleBranchesChange(value) {
    this.utils.setTree(this.match?.params?.appId, value);
    // @Todo: workaround
    window.location.reload();
  }

  menuIconOnClick(e) {
    e.stopPropagation && e.stopPropagation();
  }

  menuOnClick(e) {
    e.domEvent.stopPropagation && e.domEvent.stopPropagation();
    const { key } = e;
    switch (key) {
      case 'props': {
        return this.openEditPagePropsModal(this.getCurrentPage());
      }
      case 'open-in-new-page-preview': {
        return window.open(this.getPreviewIframeSrc());
      }
      case 'delete': {
        return this.openDeletePageConfirmModal();
      }
      default:
        break;
    }
  }

  onDesignPageBtnClick() {
    window.open(`/design/apps/${this.match.params.appId}/pages/${this.getCurrentPage()?.id}`);
  }

  onPageSelect({ key }) {
    this.setState({
      pageId: key,
    });
  }

  openCreatePageModal() {
    this.setState({
      createPageModalOpen: true,
    });
  }

  openDeletePageConfirmModal() {
    this.setState({
      deletePageConfirmModalOpen: true,
    });
  }

  openEditPagePropsModal(record) {
    this.setState(
      {
        editPagePropsModalOpen: true,
      },
      async () => {
        await this.utils.sleep(1);
        const form = this.$('edit_page_props_form')?.formRef?.current?.form;
        form.reset();
        form.setValues({
          id: record.id,
          title: record.title,
          pathname: record.pathname,
        });
        const pageData = await this.bff.getPage({
          id: record.id,
        });
        const fileName = pageData?.page?.content?.componentsTree?.[0]?.fileName;
        form.setValues({
          fileName,
        });
      }
    );
  }

  openPreview() {
    window.open(this.getPreviewIframeSrc());
  }

  componentDidMount() {}

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Page pagePadding={0} pagePaddingBottom={0} pagePaddingTop={0} style={{ padding: '0' }}>
        <Card
          __component_name="Card"
          actions={[]}
          bordered={false}
          hoverable={false}
          loading={false}
          ref={this._refsManager.linkRef('card-e6c7c8c3')}
          size="default"
          style={{}}
          type="default"
        >
          <Row __component_name="Row" wrap={false}>
            <Col
              __component_name="Col"
              flex="270px"
              ref={this._refsManager.linkRef('col-f6e9b8a5')}
              style={{ height: 'calc(100% - 800px)' }}
            >
              <Row
                __component_name="Row"
                align="stretch"
                justify="space-between"
                style={{ marginBottom: '16px' }}
                wrap={false}
              >
                <Col __component_name="Col" flex="auto">
                  <Input.Search
                    __component_name="Input.Search"
                    onChange={function () {
                      this.handleSearchValueChange.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    placeholder={this.i18n('i18n-xgcwv3vl') /* 请输入页面标题 */}
                  />
                </Col>
                <Col __component_name="Col" flex="42px" style={{ padding: '0' }}>
                  <Button
                    __component_name="Button"
                    block={false}
                    danger={false}
                    disabled={false}
                    ghost={false}
                    icon={<AntdIconPlusOutlined __component_name="AntdIconPlusOutlined" />}
                    onClick={function () {
                      return this.openCreatePageModal.apply(
                        this,
                        Array.prototype.slice.call(arguments).concat([])
                      );
                    }.bind(this)}
                    shape="default"
                    type="primary"
                  />
                </Col>
              </Row>
              {!!__$$eval(
                () =>
                  !this.props.useGetApp?.loading &&
                  this.props.useGetApp?.data?.app?.pages?.length === 0
              ) && (
                <Empty
                  __component_name="Empty"
                  description={this.i18n('i18n-o0ei2yue') /* 还没有页面，点击添加按钮创建 */}
                  ref={this._refsManager.linkRef('empty-14c0d980')}
                />
              )}
              <Menu
                __component_name="Menu"
                defaultOpenKeys={[]}
                defaultSelectedKeys={__$$eval(() => this.getCurrentPage()?.id)}
                forceSubMenuRender={false}
                inlineCollapsed={false}
                inlineIndent={8}
                mode="inline"
                multiple={false}
                openKeys={[]}
                selectable={true}
                selectedKeys={__$$eval(() => this.getCurrentPage()?.id)}
                style={{ height: 'calc(100vh - 160px)', overflow: 'auto' }}
                subMenuCloseDelay={0}
                subMenuOpenDelay={0}
                theme="light"
                triggerSubMenuAction="hover"
              >
                {__$$evalArray(() => this.props.useGetApp?.data?.app?.pages || []).map(
                  (item, index) =>
                    (__$$context => (
                      <Menu.Item
                        __component_name="Menu.Item"
                        disabled={false}
                        itemIcon={
                          <Dropdown
                            __component_name="Dropdown"
                            destroyPopupOnHide={true}
                            disabled={false}
                            menu={{
                              items: [
                                { key: 'props', label: this.i18n('i18n-l3bqhr6f') /* 属性设置 */ },
                                { key: 'delete', label: this.i18n('i18n-it3zdrk8') /* 删除 */ },
                              ],
                              onClick: function () {
                                return this.menuOnClick.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(__$$context),
                            }}
                            placement="bottomLeft"
                            trigger={['hover']}
                          >
                            <AntdIconEllipsisOutlined
                              __component_name="AntdIconEllipsisOutlined"
                              onClick={function () {
                                return this.menuIconOnClick.apply(
                                  this,
                                  Array.prototype.slice.call(arguments).concat([])
                                );
                              }.bind(__$$context)}
                              style={{
                                display: 'inline-block',
                                marginRight: '-20px',
                                textAlign: 'center',
                                width: '30px',
                              }}
                            />
                          </Dropdown>
                        }
                        key={__$$eval(() => item.id)}
                        onClick={function () {
                          return this.onPageSelect.apply(
                            this,
                            Array.prototype.slice.call(arguments).concat([])
                          );
                        }.bind(__$$context)}
                        style={{ paddingLeft: '8px' }}
                      >
                        {__$$eval(() => item.title)}
                      </Menu.Item>
                    ))(__$$createChildContext(__$$context, { item, index }))
                )}
              </Menu>
            </Col>
            <Col __component_name="Col" flex="auto" style={{ height: '100%' }}>
              <Row
                __component_name="Row"
                justify="space-between"
                style={{ marginBottom: '16px' }}
                wrap={false}
              >
                <Col __component_name="Col">
                  <Typography.Title
                    __component_name="Typography.Title"
                    bold={true}
                    bordered={false}
                    ellipsis={true}
                    level={1}
                  >
                    {__$$eval(() => this.getCurrentPage()?.title)}
                  </Typography.Title>
                </Col>
                <Col __component_name="Col">
                  <Space __component_name="Space" align="center" direction="horizontal">
                    <Select
                      __component_name="Select"
                      _sdkSwrGetFunc={{}}
                      allowClear={false}
                      disabled={false}
                      notFoundContent=""
                      onChange={function () {
                        return this.handleBranchesChange.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      options={__$$eval(() => this.getBranchesOptions())}
                      placeholder={this.i18n('i18n-lc0lwakk') /* - */}
                      showSearch={true}
                      style={{ minWidth: '120px' }}
                      value={__$$eval(() => this.utils.getTreeById(this.match?.params?.appId))}
                    />
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      onClick={function () {
                        return this.openPreview.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                    >
                      {this.i18n('i18n-scef9t49') /* 新窗口预览 */}
                    </Button>
                    <Button
                      __component_name="Button"
                      block={false}
                      danger={false}
                      disabled={false}
                      ghost={false}
                      onClick={function () {
                        return this.onDesignPageBtnClick.apply(
                          this,
                          Array.prototype.slice.call(arguments).concat([])
                        );
                      }.bind(this)}
                      shape="default"
                      type="primary"
                    >
                      {this.i18n('i18n-io50zahr') /* 设计页面 */}
                    </Button>
                  </Space>
                </Col>
              </Row>
              <Row __component_name="Row" wrap={true}>
                <Col
                  __component_name="Col"
                  span={24}
                  style={{ height: 'calc(100vh - 160px)', width: '100%' }}
                >
                  <Iframe
                    __component_name="Iframe"
                    __showRealSrc={false}
                    name="iframe1"
                    src={__$$eval(() => this.getPreviewIframeSrc())}
                    style={{
                      border: '1px solid',
                      borderRadius: '2px',
                      bottom: '0',
                      height: '100%',
                      left: '0',
                      outline: 'none',
                      overflow: 'auto',
                      position: 'relative',
                      right: '0',
                      top: '0',
                      width: '100%',
                      zIndex: '1',
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.closeEditPagePropsModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.confirmEditPageProps.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.editPagePropsModalOpen)}
          title={this.i18n('i18n-l3bqhr6f') /* 属性设置 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 4,
              layout: 'horizontal',
              wrapperCol: 20,
            }}
            ref={this._refsManager.linkRef('edit_page_props_form')}
          >
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-xgcwv3vl') /* 请输入页面标题 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { asterisk: true } }}
              fieldProps={{
                'name': 'title',
                'title': this.i18n('i18n-3e6ypkso') /* 页面标题 */,
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message: this.i18n('i18n-xgcwv3vl') /* 请输入页面标题 */,
                    required: true,
                    type: 'disabled',
                    whitespace: true,
                  },
                ],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-umtxjgit') /* 请输入页面访问路径 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { asterisk: true, colon: false } }}
              fieldProps={{
                'name': 'pathname',
                'title': this.i18n('i18n-21sko24b') /* 页面路由 */,
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message: this.i18n('i18n-umtxjgit') /* 请输入页面访问路径 */,
                    required: true,
                    type: 'disabled',
                    whitespace: true,
                  },
                ],
              }}
            />
            <FormilyTextArea
              __component_name="FormilyTextArea"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-6t2leoby') /* 请输入页面文件名 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { asterisk: true, colon: false } }}
              fieldProps={{
                '_unsafe_MixedSetter_description_select': 'StringSetter',
                'description': '用于出码时页面文件的命名',
                'name': 'fileName',
                'title': this.i18n('i18n-8aq0hr2j') /* 文件名 */,
                'x-component': 'Input.TextArea',
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message: this.i18n('i18n-6t2leoby') /* 请输入页面文件名 */,
                    required: true,
                    type: 'disabled',
                    whitespace: true,
                  },
                ],
              }}
            />
          </FormilyForm>
        </Modal>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.closeCreatePageModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.confirmCreatePage.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.createPageModalOpen)}
          title={this.i18n('i18n-8hwlwfxt') /* 新增页面 */}
        >
          <FormilyForm
            __component_name="FormilyForm"
            componentProps={{
              colon: false,
              labelAlign: 'left',
              labelCol: 4,
              layout: 'horizontal',
              wrapperCol: 20,
            }}
            ref={this._refsManager.linkRef('create_page_form')}
          >
            <FormilySelect
              __component_name="FormilySelect"
              componentProps={{
                'x-component-props': {
                  _unsafe_MixedSetter_enum_select: 'ExpressionSetter',
                  allowClear: false,
                  disabled: false,
                  enum: null,
                  placeholder: '请选择',
                },
              }}
              decoratorProps={{
                'x-decorator-props': {
                  _unsafe_MixedSetter_tooltip_select: 'StringSetter',
                  tooltip: '目前只支持选择应用内的页面作为模板',
                },
              }}
              fieldProps={{
                '_unsafe_MixedSetter_enum_select': 'ExpressionSetter',
                'enum': __$$eval(() => this.getPagesOptions()),
                'name': 'contentFrom.pageId',
                'title': this.i18n('i18n-a7dfj5mr') /* 模板 */,
                'x-validator': [],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-xgcwv3vl') /* 请输入页面标题 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { asterisk: true } }}
              fieldProps={{
                'name': 'title',
                'title': this.i18n('i18n-3e6ypkso') /* 页面标题 */,
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message: this.i18n('i18n-xgcwv3vl') /* 请输入页面标题 */,
                    required: true,
                    type: 'disabled',
                    whitespace: true,
                  },
                ],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{
                'x-component-props': {
                  placeholder: this.i18n('i18n-umtxjgit') /* 请输入页面访问路径 */,
                },
              }}
              decoratorProps={{ 'x-decorator-props': { asterisk: true, colon: false } }}
              fieldProps={{
                'name': 'pathname',
                'title': this.i18n('i18n-21sko24b') /* 页面路由 */,
                'x-validator': [
                  {
                    children: '未知',
                    icon: 'tenx-ui-icon:Circle',
                    id: 'disabled',
                    message: this.i18n('i18n-umtxjgit') /* 请输入页面访问路径 */,
                    required: true,
                    type: 'disabled',
                    whitespace: true,
                  },
                ],
              }}
            />
            <FormilyInput
              __component_name="FormilyInput"
              componentProps={{ 'x-component-props': { placeholder: '请输入' } }}
              decoratorProps={{ 'x-decorator-props': { asterisk: true } }}
              fieldProps={{
                'description':
                  this.i18n(
                    'i18n-godkp0bg'
                  ) /* 用于出码时页面文件的命名，要符合 React 组件大驼峰命名要求 */,
                'name': 'fileName',
                'title': this.i18n('i18n-8aq0hr2j') /* 文件名 */,
                'x-validator': [],
              }}
            />
          </FormilyForm>
        </Modal>
        <Modal
          __component_name="Modal"
          centered={false}
          confirmLoading={false}
          destroyOnClose={true}
          forceRender={false}
          keyboard={true}
          mask={true}
          maskClosable={false}
          onCancel={function () {
            return this.closeDeletePageConfirmModal.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          onOk={function () {
            return this.confirmDeletePage.apply(
              this,
              Array.prototype.slice.call(arguments).concat([])
            );
          }.bind(this)}
          open={__$$eval(() => this.state.deletePageConfirmModalOpen)}
          title="确认删除页面"
        >
          <Alert
            __component_name="Alert"
            message={__$$eval(() => `确定删除页面 ${this.getCurrentPage()?.title} 吗？`)}
            showIcon={true}
            type="warning"
          />
        </Modal>
      </Page>
    );
  }
}

const PageWrapper = (props = {}) => {
  const location = useLocation();
  const history = getUnifiedHistory();
  const match = matchPath({ path: '/apps/:appId/pages' }, location.pathname);
  history.match = match;
  history.query = qs.parse(location.search);
  const appHelper = {
    utils,
    constants: __$$constants,
    location,
    match,
    history,
  };
  const self = {
    appHelper,
    ...appHelper,
  };
  return (
    <DataProvider
      self={self}
      sdkInitFunc={{
        enabled: true,
        func: 'getSdkById',
        params: function applyThis() {
          return this.match?.params?.appId;
        }.apply(self),
      }}
      sdkSwrFuncs={[
        {
          func: 'useGetApp',
          params: function applyThis() {
            return {
              id: this.match?.params?.appId,
              tree: this.utils.getTreeById(this.match?.params?.appId),
            };
          }.apply(self),
          enableLocationSearch: undefined,
        },
        {
          func: 'useGetCurrentUser',
          params: undefined,
          enableLocationSearch: undefined,
        },
      ]}
      render={dataProps => (
        <AppDetailPages$$Page {...props} {...dataProps} self={self} appHelper={appHelper} />
      )}
    />
  );
};
export default PageWrapper;

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) {}
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
    // 重写 state getter，保证 state 的指向不变，这样才能从 context 中拿到最新的 state
    get state() {
      return oldContext.state;
    },
    // 重写 props getter，保证 props 的指向不变，这样才能从 context 中拿到最新的 props
    get props() {
      return oldContext.props;
    },
  };
  childContext.__proto__ = oldContext;
  return childContext;
}
