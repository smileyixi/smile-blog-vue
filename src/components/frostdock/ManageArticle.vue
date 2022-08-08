<template>
  <section>
    <div class="manageArticleBox">
      <div class="wrapper">
        
        <!-- 信息栏 -->
        <div class="info-col">
            <h2>
                <svg data-v-6ca92fe4="" t="1659710201800" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2296" width="27" height="27" class="icon"><path data-v-6ca92fe4="" d="M288 416h192c17.67 0 32-14.33 32-32s-14.33-32-32-32H288c-17.67 0-32 14.33-32 32s14.33 32 32 32zM288 576h352c17.69 0 32-14.31 32-32s-14.31-32-32-32H288c-17.67 0-32 14.31-32 32s14.33 32 32 32zM480 672H288c-17.67 0-32 14.31-32 32s14.33 32 32 32h192c17.67 0 32-14.31 32-32s-14.33-32-32-32zM939.98 645.16L826.84 532.02c-6.25-6.25-14.44-9.37-22.63-9.37s-16.38 3.12-22.63 9.37L553.37 760.24c-6 6-9.37 14.14-9.37 22.63V896c0 17.67 14.33 32 32 32h113.14c8.49 0 16.63-3.37 22.63-9.37l228.21-228.21c12.49-12.5 12.49-32.76 0-45.26zM675.88 864H608v-67.88L804.21 599.9l67.88 67.88L675.88 864z" p-id="2297" fill="#fff"></path><path data-v-6ca92fe4="" d="M448 864H192V160h383.86l0.11 128.09c0.06 35.23 28.78 63.91 64 63.91H768v80c0 17.67 14.33 32 32 32s32-14.33 32-32V274.87c0-8.58-3.45-16.8-9.56-22.82L673.09 105.18A32.002 32.002 0 0 0 650.66 96H160c-17.67 0-32 14.33-32 32v768c0 17.67 14.33 32 32 32h288c17.67 0 32-14.33 32-32s-14.33-32-32-32z m319.72-576H639.97l-0.1-125.73L767.72 288z" p-id="2298" fill="#fff"></path></svg>
                管理文章
            </h2>
            <button
            class="btn-base btn-offset"
            >新增</button>
        </div>

        <!-- 操作栏 -->
        <div class="ctl-col">

            <div class="dropdownbox">
                <!-- 删除文章或者其他操作 -->
                <el-dropdown>
                    <el-button type="primary" class="btn-drop">
                        选中项<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>删除</el-dropdown-item>
                        <el-dropdown-item>禁止评论</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                
                <!-- 分类过滤 -->
                <el-dropdown>
                    <el-button type="primary" class="btn-drop">
                        所有分类<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>默认分类</el-dropdown-item>
                        <el-dropdown-item>日常</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

            <div class="searchbox">
                <el-input
                class="input-search"
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"/>
                <button class="btn-base btn-search">
                    search
                </button>
            </div>
        </div>
        
        <!-- 表格 -->
        <el-table
        :data="articleList.filter(data => !search || articleList.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
            <el-table-column
            label="标题"
            prop="title">
            </el-table-column>

            <el-table-column
            label="作者"
            prop="author">
            </el-table-column>

            <el-table-column
            label="分类"
            prop="category">
            </el-table-column>

            <el-table-column
            label="日期"
            prop="createAt">
            </el-table-column>

            <el-table-column
            align="right">
            
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        articleList: [
            {
                title: 'test',
                author: 'smilesl',
                category: '默认分类',
                createAt: '2022-8-8'
            },
            {
                title: 'test',
                author: 'smilesl',
                category: '默认分类',
                createAt: '2022-8-8'
            }
        ],
        search: ''
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
  }
</script>

<style lang="less" scoped>
// manage页面变量
// @manage-uncheck-color:rgb(73, 73, 73);


.manageArticleBox {
  color: var(--sm-main-color);
  width: 100%;
  padding: 20px 0;
  border-radius: 20px 20px 0 0;
  background: var(--sm-dark-color);
}
.wrapper {
    width: 90%;
    margin: 0 auto;

    .info-col, .ctl-col {
        display: flex;
    }

    // 标题信息栏
    .info-col {
        
        // 标题
        h2 {
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--sm-frost-color);
            font-size: 1.2em;
            padding: 2px 7px;
            width: 150px;
            border-radius: 5px 0 0 5px;
            box-shadow: 4px 4px 2px rebeccapurple;
        }
        .btn-offset {
            position: relative;
            // bottom: -20px;
            left: -20px;
            height: 30px;
            box-shadow: 3px 3px 3px rgb(32, 32, 32);
        }
    }

    // 控制栏
    .ctl-col {
        height: 30px;
        padding: 20px 0 50px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

        // 搜索框
        .searchbox {
            height: 30px;

            .input-search {
                width: 250px;
                height: 100%;
            }
            .btn-search {
                height: 100%;
            }
        }
        
        // 下拉选项组
        .dropdownbox {
            &>div {
                margin-right: 10px;
            }
            .btn-drop {
                height: 30px;
                // width: 100px;
                background: transparent;
                border: none;
                transition: .3s;

                &::before {
                    content: "";
                    height: 2px;
                    background-color: var(--sm-frost-color);
                    width: 100%;
                    position: absolute;
                    left: 0;
                    bottom: 0px;
                    transform: scaleX(0);
                    transition: 0.3s;
                }
                &:hover::before {
                    transform: scaleX(1);
                }
            }
        }
        
        
    }
}
</style>