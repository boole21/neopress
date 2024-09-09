## 合作开发develop分支

url: <https://blog.csdn.net/m0_50789696/article/details/127762643>

不要在master分支上开发，master分支是主分支，用于部署，所有开发分支都从master分支拉取，开发完成后再合并到master分支。

1. 克隆项目指定分支到本地

   ```bash
   git clone -b develop  git@github.com:boole21/pan.git
   ```

2. 创建自己的本地分支

  ```bash
   git checkout -b bbs
  ```

3. 在自己分支上开发

4. 开发完成，提交代码至暂存区

    ```bash
    git add .
    ```

5. 提交到本地仓库

  ```bash
  git commit -m 'first bbs commit'
  ```

6. 切换到develop分支，拉起最新代码

  ```bash
  git checkout develop
  git pull
  ```

7. 将自己的分支与远程develop分支合并（禁用Fast Forward模式）

  ```bash
  git merge bbs --no-ff
  ```

8. 修改冲突
9. 再次加入暂存区add，提交到仓库commit

  ```bash
  git add .
  git commit
  ```

10. 无冲突后，直接推送到远程

  ```bash
  git push
  ```
