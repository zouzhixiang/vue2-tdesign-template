<template>
  <div class="page">
    <t-watermark :watermark-content="{
        text: `${systemName}(${username})`
      }" :width="120" :height="60" :y="120" :x="80" style="height: auto">
      <div class="empty">
        <i>🚧</i>
        <strong>页面建设中...</strong>
      </div>
      <t-space direction="vertical">
        <t-card title="主题色系" :bordered="false">
          <t-table rowKey="index" :data="themeColorsWithIndex" :columns="themeColumns"></t-table>
        </t-card>
        <t-card title="状态色系" :bordered="false">
          <t-table rowKey="index" :data="statusColorsWithIndex" :columns="themeColumns"></t-table>
        </t-card>
        <t-card title="文字色系" :bordered="false">
          <t-table rowKey="index" :data="textColorsWithIndex" :columns="themeColumns"></t-table>
        </t-card>
        <t-card title="辅助色系" :bordered="false">
          <t-table rowKey="index" :data="supportColorsWithIndex" :columns="themeColumns"></t-table>
        </t-card>
        <t-card title="阴影" :bordered="false">
          <t-table rowKey="index" :data="shadowColorsWithIndex" :columns="colorColumns"></t-table>
        </t-card>
        <t-card title="其他" :bordered="false">
          <t-table rowKey="index" :data="otherColorsWithIndex" :columns="colorColumns"></t-table>
        </t-card>
      </t-space>
    </t-watermark>
  </div>
</template>

<script>
import * as themes from '@/style/theme'

export default {
  data () {
    return {
      systemName: process.env.VUE_APP_SYS_NAME,
      themeColumns: [
        {
          title: '默认色系',
          colspan: 2,
          width: 120,
          className: 'custom-cell',
          attrs: ({ row, type }) => {
            if (type === 'td' && row.color) {
              return {
                style: {
                  backgroundColor: row.color
                }
              }
            }
          }
        },
        {
          colKey: 'color',
          width: 140,
          className: 'custom-cell',
          ellipsis: true
        },
        {
          title: '产品色系',
          colspan: 2,
          width: 120,
          className: 'custom-cell',
          attrs: ({ row, type }) => {
            if (type === 'td') {
              return {
                style: {
                  backgroundColor: row.customColor
                }
              }
            }
          }
        },
        {
          colKey: 'customColor',
          width: 120,
          className: 'custom-cell'
        },
        {
          title: '默认基础变量',
          colKey: 'variable',
          width: 164,
          className: 'custom-cell'
        },
        {
          title: '产品自定义基础变量',
          width: 150,
          colKey: 'customVariable',
          className: 'custom-cell'
        },
        {
          title: '默认应用变量',
          width: 290,
          colKey: 'appVariable',
          className: 'custom-cell',
          cell: (h, { row }) => {
            const variable = row.appVariable.split(',')
            return variable.map(item => {
              return <p domPropsInnerHTML={item}></p>
            })
          }
        },
        {
          title: '默认应用变量调整',
          width: 290,
          colKey: 'appVariableChange',
          className: 'custom-cell',
          cell: (h, { row }) => {
            if (row.appVariableChange) {
              const variable = row.appVariableChange.split(',')
              return variable.map(item => {
                return <p>{item}</p>
              })
            }
          }
        },
        {
          title: '产品自定义应用变量',
          colKey: 'customAppVariable',
          className: 'custom-cell'
        }
      ],
      colorColumns: [
        {
          title: '默认色系',
          colKey: 'shadowColor',
          colspan: 2,
          width: 120,
          className: 'custom-cell',
          cell: (h, { row }) => {
            if (row.shadowColor) {
              return (
                <div style={{ width: '80%', height: '30px', margin: '20px auto', boxShadow: row.shadowColor }}></div>
              )
            }
          },
          attrs: ({ row, type }) => {
            if (type === 'td' && row.color) {
              return {
                style: {
                  backgroundColor: row.color
                }
              }
            }
          }
        },
        {
          className: 'custom-cell',
          width: '30%',
          cell: (h, { row }) => {
            return row.shadowColor ? row.shadowColor : row.color
          },
          ellipsis: true
        },
        {
          title: '默认变量',
          colKey: 'variable',
          width: 250,
          className: 'custom-cell'
        },
        {
          title: '产品色系',
          colKey: 'customShadowColor',
          colspan: 2,
          width: 120,
          className: 'custom-cell',
          cell: (h, { row }) => {
            if (row.customShadowColor) {
              return (
                <div
                  style={{ width: '80%', height: '30px', margin: '20px auto', boxShadow: row.customShadowColor }}
                ></div>
              )
            }
          },
          attrs: ({ row, type }) => {
            if (type === 'td' && row.customColor) {
              return {
                style: {
                  backgroundColor: row.customColor
                }
              }
            }
          }
        },
        {
          className: 'custom-cell',
          cell: (h, { row }) => {
            return row.customShadowColor ? row.customShadowColor : row.customColor
          }
        },
        {
          title: '产品自定义变量',
          colKey: 'customVariable',
          className: 'custom-cell'
        }
      ],
      themeColors: [
        {
          color: '#f2f3ff',
          variable: '--td-brand-color-1',
          appVariable: '--td-brand-color-light',
          customColor: '',
          customVariable: ''
        },
        {
          color: '#d9e1ff',
          variable: '--td-brand-color-2',
          appVariable: '--td-brand-color-focus, --td-brand-color-light-hover',
          customColor: '',
          customVariable: ''
        },
        {
          color: '#b5c7ff',
          variable: '--td-brand-color-3',
          appVariable: '--td-brand-color-disabled',
          customColor: '',
          customVariable: ''
        },
        {
          color: '#8eabff',
          variable: '--td-brand-color-4',
          appVariable: '',
          customColor: '',
          customVariable: ''
        },
        {
          color: '#618dff',
          variable: '--td-brand-color-5',
          appVariable: '',
          customColor: '',
          customVariable: ''
        },
        {
          color: '#366ef4',
          variable: '--td-brand-color-6',
          appVariable: '--td-brand-color-hover',
          customColor: '',
          customVariable: ''
        },
        {
          color: '#0052d9',
          variable: '--td-brand-color-7',
          appVariable: '--td-brand-color, --td-text-color-brand',
          customColor: '',
          customVariable: ''
        },
        {
          color: '#003cab',
          variable: '--td-brand-color-8',
          appVariable: '--td-brand-color-active, --td-text-color-link',
          customColor: '',
          customVariable: ''
        },
        {
          color: '#002a7c',
          variable: '--td-brand-color-9',
          appVariable: '',
          customColor: '',
          customVariable: ''
        },
        {
          color: '#001a57',
          variable: '--td-brand-color-10',
          appVariable: '',
          customColor: '',
          customVariable: ''
        },
        {
          color: '',
          variable: '',
          appVariable: '',
          customColor: '',
          customVariable: '--td-brand-color-11'
        },
        {
          color: '',
          variable: '',
          appVariable: '',
          customColor: '',
          customVariable: '--td-brand-color-12'
        }
      ],
      statusColors: [
        {
          color: '#e3f9e9',
          variable: '--td-success-color-1',
          customColor: '#E3F9E2',
          customVariable: '',
          appVariable: '--td-success-color-light'
        },
        {
          color: '#c6f3d7',
          variable: '--td-success-color-2',
          customColor: '#C9F3CC',
          customVariable: '',
          appVariable: '--td-success-color-focus, --td-success-color-light-hover'
        },
        {
          color: '#92dab2',
          variable: '--td-success-color-3',
          customColor: '#97DBA2',
          customVariable: '',
          appVariable: '--td-success-color-disabled'
        },
        {
          color: '#56c08d',
          variable: '--td-success-color-4',
          customColor: '#62C079',
          customVariable: '',
          appVariable: '--td-success-color-hover'
        },
        {
          color: '#2ba471',
          variable: '--td-success-color-5',
          customColor: '#32AB5C',
          customVariable: '',
          appVariable: '--td-success-color'
        },
        {
          color: '#008858',
          variable: '--td-success-color-6',
          customColor: '#00893F',
          customVariable: '',
          appVariable: '--td-success-color-active'
        },
        {
          color: '#006c45',
          variable: '--td-success-color-7',
          customColor: '#006D30',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#005334',
          variable: '--td-success-color-8',
          customColor: '#005423',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#003b23',
          variable: '--td-success-color-9',
          customColor: '#003C17',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#002515',
          variable: '--td-success-color-10',
          customColor: '#03250F',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '',
          variable: '',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#fff1e9',
          variable: '--td-warning-color-1',
          customColor: '#FFF1EA',
          customVariable: '',
          appVariable: '--td-warning-color-light'
        },
        {
          color: '#ffd9c2',
          variable: '--td-warning-color-2',
          customColor: '#FFD9C7',
          customVariable: '',
          appVariable: '--td-warning-color-focus, --td-warning-color-light-hover'
        },
        {
          color: '#ffb98c',
          variable: '--td-warning-color-3',
          customColor: '#FFB996',
          customVariable: '',
          appVariable: '--td-warning-color-disabled'
        },
        {
          color: '#fa9550',
          variable: '--td-warning-color-4',
          customColor: '',
          customVariable: '',
          appVariable: '--td-warning-color-hover'
        },
        {
          color: '#e37318',
          variable: '--td-warning-color-5',
          customColor: '#FF8341',
          customVariable: '',
          appVariable: '--td-warning-color'
        },
        {
          color: '#be5a00',
          variable: '--td-warning-color-6',
          customColor: '#E6702F',
          customVariable: '',
          appVariable: '--td-warning-color-active'
        },
        {
          color: '#954500',
          variable: '--td-warning-color-7',
          customColor: '#C25615',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#713300',
          variable: '--td-warning-color-8',
          customColor: '#9E3E00',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#532300',
          variable: '--td-warning-color-9',
          customColor: '#782D00',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#3b1700',
          variable: '--td-warning-color-10',
          customColor: '#581F00',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '',
          variable: '',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#fff0ed',
          variable: '--td-error-color-1',
          customColor: '#FFF0ED',
          customVariable: '',
          appVariable: '--td-error-color-light'
        },
        {
          color: '#ffd8d2',
          variable: '--td-error-color-2',
          customColor: '#FFD8D4',
          customVariable: '',
          appVariable: '--td-error-color-focus, --td-error-color-light-hover'
        },
        {
          color: '#ffb9b0',
          variable: '--td-error-color-3',
          customColor: '#FFB8B4',
          customVariable: '',
          appVariable: '--td-error-color-disabled'
        },
        {
          color: '#ff9285',
          variable: '--td-error-color-4',
          customColor: '#FF918F',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#f6685d',
          variable: '--td-error-color-5',
          customColor: '',
          customVariable: '',
          appVariable: '--td-error-color-hover'
        },
        {
          color: '#d54941',
          variable: '--td-error-color-6',
          customColor: '#F85053',
          customVariable: '',
          appVariable: '--td-error-color'
        },
        {
          color: '#ad352f',
          variable: '--td-error-color-7',
          customColor: '#DC4044',
          customVariable: '',
          appVariable: '--td-error-color-active'
        },
        {
          color: '#881f1c',
          variable: '--td-error-color-8',
          customColor: '#B32B31',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#68070a',
          variable: '--td-error-color-9',
          customColor: '#8E161F',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#490002',
          variable: '--td-error-color-10',
          customColor: '#6B000D',
          customVariable: '',
          appVariable: ''
        }
      ],
      textColors: [
        {
          color: '#ffffff',
          variable: '--td-font-white-1',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: 'rgba(255, 255, 255, 0.55)',
          variable: '--td-font-white-2',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: 'rgba(255, 255, 255, 0.35)',
          variable: '--td-font-white-3',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: 'rgba(255, 255, 255, 0.22)',
          variable: '--td-font-white-4',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: 'rgba(0, 0, 0, 0.9)',
          variable: '--td-font-gray-1',
          customColor: '#1d2129',
          customVariable: '',
          appVariable: '--td-text-color-primary'
        },
        {
          color: 'rgba(0, 0, 0, 0.6)',
          variable: '--td-font-gray-2',
          customColor: '#4e5969',
          customVariable: '',
          appVariable: '--td-text-color-secondary'
        },
        {
          color: '',
          variable: '',
          customColor: '#86909C',
          customVariable: '',
          appVariable: '',
          customAppVariable: '--td-text-color-regular'
        },
        {
          color: 'rgba(0, 0, 0, 0.4)',
          variable: '--td-font-gray-3',
          customColor: '#C8CCD4',
          customVariable: '',
          appVariable: '--td-text-color-placeholder'
        },
        {
          color: 'rgba(0, 0, 0, 0.26)',
          variable: '--td-font-gray-4',
          customColor: '#C8CCD4',
          customVariable: '',
          appVariable: '--td-text-color-disabled'
        }
      ],
      supportColors: [
        {
          color: '',
          variable: '',
          customColor: '#FCFDFD',
          customVariable: '--td-gray-color-0',
          appVariable: ''
        },
        {
          color: '#f3f3f3',
          variable: '--td-gray-color-1',
          customColor: '#F7F8FA',
          customVariable: '',
          appVariable: '--td-bg-color-container-hover, --td-bg-color-secondarycontainer',
          appVariableChange: '--td-bg-color-component-disabled'
        },
        {
          color: '#eee',
          variable: '--td-gray-color-2',
          customColor: '#F5F8FC',
          customVariable: '',
          appVariable: '--td-bg-color-page, --td-bg-color-secondarycontainer-hover, <del>--td-bg-color-component-disabled</del>'
        },
        {
          color: '#e8e8e8',
          variable: '--td-gray-color-3',
          customColor: '#F1F2F4',
          customVariable: '',
          appVariable: '--td-bg-color-container-active, --td-bg-color-component, <del>--td-border-level-1-color</del>, <del>--td-component-stroke</del>',
          appVariableChange: ''
        },
        {
          color: '#ddd',
          variable: '--td-gray-color-4',
          customColor: '#ECECEE',
          customVariable: '',
          appVariable: '--td-bg-color-secondarycontainer-active, --td-bg-color-component-hover, --td-bg-color-secondarycomponent, <del>--td-border-level-2-color</del>, <del>--td-component-border</del>',
          appVariableChange: '--td-border-level-1-color, --td-component-stroke'
        },
        {
          color: '#c6c6c6',
          variable: '--td-gray-color-5',
          customColor: '#E7E9EA',
          customVariable: '',
          appVariable: '--td-bg-color-secondarycomponent-hover'
        },
        {
          color: '#a6a6a6',
          variable: '--td-gray-color-6',
          customColor: '#E5E6EA',
          customVariable: '',
          appVariable: '--td-bg-color-component-active, --td-bg-color-secondarycomponent-active'
        },
        {
          color: '#8b8b8b',
          variable: '--td-gray-color-7',
          customColor: '#E3E6E9',
          customVariable: '',
          appVariable: '',
          appVariableChange: '--td-border-level-2-color, --td-component-border'
        },
        {
          color: '#777',
          variable: '--td-gray-color-8',
          customColor: '#DADEE5',
          customVariable: '',
          appVariable: '',
          customAppVariable: '--td-border-level-3-color'
        },
        {
          color: '#5e5e5e',
          variable: '--td-gray-color-9',
          customColor: '#C8CCD4',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#4b4b4b',
          variable: '--td-gray-color-10',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#393939',
          variable: '--td-gray-color-11',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#2c2c2c',
          variable: '--td-gray-color-12',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#242424',
          variable: '--td-gray-color-13',
          customColor: '',
          customVariable: '',
          appVariable: ''
        },
        {
          color: '#181818',
          variable: '--td-gray-color-14',
          customColor: '',
          customVariable: '',
          appVariable: ''
        }
      ],
      shadowColors: [
        {
          shadowColor:
              '0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%)',
          variable: '--td-shadow-1',
          customShadowColor: ''
        },
        {
          shadowColor:
              '0 3px 14px 2px rgba(0, 0, 0, 0.05), 0 8px 10px 1px rgba(0, 0, 0, 6%), 0 5px 5px -3px rgba(0, 0, 0, 10%)',
          variable: '--td-shadow-2',
          customShadowColor: ''
        },
        {
          shadowColor:
              '0 6px 30px 5px rgba(0, 0, 0, 0.05), 0 16px 24px 2px rgba(0, 0, 0, 4%), 0 8px 10px -5px rgba(0, 0, 0, 8%)',
          variable: '--td-shadow-3',
          customShadowColor: ''
        },
        {
          shadowColor: 'inset 0 0.5px 0 #dcdcdc',
          variable: '--td-shadow-inset-top',
          customShadowColor: ''
        },
        {
          shadowColor: 'inset 0.5px 0 0 #dcdcdc',
          variable: '--td-shadow-inset-right',
          customShadowColor: ''
        },
        {
          shadowColor: 'inset 0 -0.5px 0 #dcdcdc',
          variable: '--td-shadow-inset-bottom',
          customShadowColor: ''
        },
        {
          shadowColor: 'inset -0.5px 0 0 #dcdcdc',
          variable: '--td-shadow-inset-left',
          customShadowColor: ''
        },
        {
          shadowColor: 'rgba(0, 0, 0, 0.08)',
          variable: '--td-table-shadow-color',
          customShadowColor: ''
        },
        {
          shadowColor: '',
          variable: '',
          customShadowColor: '0px 0px 13px 0px rgba(103, 123, 153, 0.07)',
          customVariable: '--td-bg-shadow-color'
        },
        {
          shadowColor: '',
          variable: '',
          customShadowColor: '0px 4px 6px 0px rgba(103, 123, 153, 0.07)',
          customVariable: '--td-card-shadow-color'
        },
        {
          shadowColor: '',
          variable: '',
          customShadowColor: '0px 2px 6px 0px rgba(171, 182, 196, 0.3)',
          customVariable: '--td-pop-shadow-color'
        },
        {
          shadowColor: '',
          variable: '',
          customShadowColor: '0px 4px 6px 0px rgba(103, 123, 153, 0.07)',
          customVariable: '--td-map-pop-shadow-color'
        },
        {
          shadowColor: '',
          variable: '',
          customShadowColor: '0px 6px 6px 0px rgba(171, 182, 196, 0.4)',
          customVariable: '--td-map-default-shadow-color'
        }
      ],
      otherColors: [
        {
          color: 'rgba(0, 0, 0, 0.6)',
          variable: '--td-mask-active',
          customColor: ''
        },
        {
          color: 'rgba(255, 255, 255, 0.6)',
          variable: '--td-mask-disabled',
          customColor: ''
        },
        {
          color: '#fff',
          variable: '--td-bg-color-container',
          customColor: ''
        },
        {
          color: '#fff',
          variable: '--td-bg-color-container-select',
          customColor: ''
        },
        {
          color: '#fff',
          variable: '--td-bg-color-specialcomponent',
          customColor: ''
        },
        {
          color: '#fff',
          variable: '--td-text-color-anti',
          customColor: ''
        },
        {
          color: 'rgba(0, 0, 0, 0.1)',
          variable: '--td-text-color-anti',
          customColor: ''
        },
        {
          color: 'rgba(0, 0, 0, 0.3)',
          variable: '--td-scrollbar-hover-color',
          customColor: ''
        },
        {
          color: '#fff',
          variable: '--td-scroll-track-color',
          customColor: ''
        }
      ]
    }
  },
  computed: {
    theme () {
      return this.$store.state.app.theme
    },
    username () {
      return this.$store.state.app.userInfo?.username
    },
    themeColorsWithIndex () {
      return this.themeColors.map((item, index) => ({ index, ...item }))
    },
    statusColorsWithIndex () {
      return this.statusColors.map((item, index) => ({ index, ...item }))
    },
    textColorsWithIndex () {
      return this.textColors.map((item, index) => ({ index, ...item }))
    },
    supportColorsWithIndex () {
      return this.supportColors.map((item, index) => ({ index, ...item }))
    },
    shadowColorsWithIndex () {
      return this.shadowColors.map((item, index) => ({ index, ...item }))
    },
    otherColorsWithIndex () {
      return this.otherColors.map((item, index) => ({ index, ...item }))
    }
  },
  watch: {
    theme: {
      handler (theme) {
        if (themes[theme]) {
          this.themeColors.forEach((item, index) => {
            item.customColor = themes[theme][index]
          })
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  margin: 0 15px;
  padding: 20px;
}
.empty {
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  i {
    font-style: normal;
    font-size: 60px;
    line-height: 1.6;
  }
  strong {
    font-size: 18px;
    letter-spacing: 3px;
  }
}
</style>
<style lang="scss">
.t-table .custom-cell {
  border: none;
  white-space: nowrap;
  word-wrap: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: var(--td-comp-paddingTB-m) var(--td-comp-paddingLR-m);

  p {
    margin: 0;
  }
}
</style>
