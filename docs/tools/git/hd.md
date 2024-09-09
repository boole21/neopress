# 后盾人Git

## 1 课程引言

## 2 集中式SVN与分布式GIT实例分析

## 3 安装git软件

```bash
git --version
```

## 4 配置坐着信息

### 4.1 全局

配置文件~/.gitconfig

```bash
  git config --global user.email "xxx@xxx.com"
  git config --global user.name "xxx"
```

### 4.2 单个项目

配置文件 .git/config

```bash
git init
git config user.name "xxx"
```

## 5 创建新仓库与维护旧仓库

```bash
git init # 新建
git clone # 克隆
rm -rf # 删除
rm -rf * # 删除文件中所有
```

## 6 git流水线操作分析

  1. add --> 放到小推车
  2. commit --> 从小推车放到仓库
  3. status --> 查看生产车间状态

## 7 使用命令完成git流水线操作

```bash
touch a.php # 添加a.php文件
git add a.php # 把a.php放入小推车
git status # 查看生产车间状况
git commit -m '测试学习' # 把小推车内容放到仓库
git add . # 把所有文件放入小推车
```

## 8 .gitgnore详解控制版本库文件管理

.gitgnore文件内容

```bash
a.txt # 排除a.txt文件
*.txt # 排除所有txt文件
!a.txt # 不排除a.txt文件
/vender # 排除vender目录
/vender/index.php # 排除vender目录下的index.php文件
/vender/*.php # 排除vender目录下的所有php文件
/vender/**/*.php # 排除vender目录下的所有php文件，包括子目录
```

## 9 从版本库中删除库的技巧

```bash
git rm a.txt # 从本地删除
git rm --cached readme.txt # 从版本库中删除
```

## 10 版本库中修改资源的技巧

```bash
git mv c.php houdunren.php
```

## 11 使用log日志查看历史操作行为

```bash
git log
git log -p # 查看修改的详细日志
git log -p -1  # 查看最近一次修改
git log --oneline # 查看简洁的日志
git log --name-only # 查看修改的文件
git log --name-status # 查看文件是什么类型的变化(添加，删除)
```

## 12 使用amend修改最新一次提交事件

```bash
git commit --amend -m '修改提交信息' # 修改最后一次提交的信息,如增加新文件b.php也可使用以上命令
```

## 13 管理暂存区的文件

```bash
git rm --cached a.php # 没有提交过，删除暂存区中新添加的文件
git reset HEAD a.php # 已经提交过，从暂存区中删除
git checkout -- a.php # 恢复文件中的内容到初始
```

## 14 alias命令别名

```bash
git config --global alias.a add # 把add命令改为a 使用git a代替git add
vim ~/.gitconfig
```

```text
[alias]
 a = add .
 c = commit
 s = status
 l = log
 b = branch
```

## 15 详解git分支Branch存在意义

HEAD:符号*,指针，表示当前在版本库中的哪个分支

## 16 实例讲解分支branch基本管理操作

```bash
git branch # 查看分支
git checkout ask # 创建分支ask
git checkout -b ask # 创建并切换到ask分支
```

## 17 规范的分支操作流程之分支的合并和删除

```bash
git merge ask # 把ask分支合并到当前分支 fast-forward 指针位移
git branch -d ask # 删除ask分支
```

## 18 正确处理分支冲突

```bash
# 文件xj.php中的内容不同产生冲突
git merge bbs
git merge ask
# 在xj.php中进行选择性修改
```

## 19 分支管理merged及分支强制删除

```bash
git branch --merged # 查看已经合并的分支 
git branch --no-merged # 查看未合并的分支
git branch -d ask # 没有合并无法删除 
git branch -D ask # 若要强制删除，使用-D
```

## 20 标准的分支操作工作流

1. main: 主分支，用于存放线上版本，不允许直接修改
2. develop: 新建分支develop,同步本地和班版库，开发完成后合并到main

## 21 stash临时存储区实例讲解

> 一个分支未完成时（不想提交）要切换到另一个分支，使用git stash暂存，否则无法切换

```bash
git stash
git stash list
git stash apply stash@{0}  # 恢复暂存
git stash drop stash@{0} # 删除暂存
git stash pop
```

## 22 使用tag标签声明项目阶段版本

```bash
git tag # 查看标签列表
git tag v1.0
```

## 23 生成zip代码发布压缩包

```bash
git archive main --prefix='hdcms' --forma=zip > hdcms.zip # main分支生成hdcms.zip压缩包,--prefix='hdcms' 压缩包中文件名前缀
```

## 24 使用系统别名定义git全局指令

```bash
vim ~/.bash_profile
vim ~/.bashrc # window用户
vim ~/.zshrc # mac/linux用户
```

```txt
alias gs="git status"
alias gc="git commit -m "
alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias gb="git branch"
alias ga="git add -A"
alias go="git checkout"
alias gp="git push;git push github"
```

## 25 分支合并产生的实际问题演示

1. 时间线简单
2. 冲突由分支解决

## 26 rebase 合理的优化分支合并

在提交前先走一下rebase，让项目线更清晰，在ask分支中git rebase main

## 27 国内外项目托管平台介绍 github gitee

## 28 SSH与GitHub远程无密码连接

```bash
ssh-keygen -t rsa

```

1. 在~/.ssh目录下生成id_rsa和id_rsa.pub文件
2. 在github中添加id_rsa.pub文件中的内容，在setting下的SSH and GPG keys中
3. 使用ssh clone来克隆不需要再填写密码
4. know_hosts缓存，若连不上，可删除试试

## 29 本地版本库使用remote和Github关联

```bash
git remote add origin git@github.com:zhangyue0503/hdcms.git # 关联远程库
git  remote -v # 查看远程库
git push -u origin main # 推送main分支到远程库
```

## 30 本地分支与github远程分支同步

```bash
git branch -a # 查看本地和远程分支
git push --set-upstream origin ask # 把ask分支推送到远程库
```

## 31 新入职员工参与项目开发时分支使用

```bash
git pull origin ask:ask # 把远程ask分支拉取到本地ask分支
git push --set-upstream origin ask # 把ask分支推送到远程库
```

## 32 github远程分支合并

1. main中git pull
2. ask分支中git rebase main
3. main中git merge ask
4. git push

## 33 远程分支删除操作 --delete

```bash
# main 中
git push origin --delete ask # 删除远程ask分支
git branch -d ask # 删除本地ask分支
```

## 34 自动部署之流程分析与创建web站点
