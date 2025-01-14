---
title: 贡献者开发维护指南
date: 2023-03-10
author: kiner-tang
---

大家好，我是[kiner-tang(文辉)](https://github.com/kiner-tang)，我个人的工作内容可以说与 Namu Design 密切相关，可以算是 Namu Design 的重度用户了。也正因如此，让我由一个使用者慢慢地向着贡献者 Contributor 迈进，将自己在工作过程中遇到的一些问题和总结出的新特性回馈于社区，并最终很荣幸地成为了 Namu Design 的 Collaborator 中的一员。在从使用者到贡献者，再从贡献者到合作者的旅途中，也遇到了不少的问题，借此机会梳理总结一下，希望能对新加入 Namu Design 社区的贡献者和合作者们有所帮助。

## 普通常见问题

### 依赖版本问题

当前流行的包管理器，无论是 npm、yarn 还是 pnpm，都会提供版本锁定的解决方案，在绝大多数时候，这可以帮我们避免包的版本不一致而导致的一些问题。但在 Namu Design 项目当中，很多功能依赖于 `react-component` 仓库中的原始组件，我们期望当遇到一些 bug 时，在 `react-component` 修复并发布 patch 版本之后，无需在 Namu Design 项目当中手动升级版本，只需重新安装依赖即可安装最新的 patch 版本的安装包。此时，包管理器提供的版本锁定文件就成了阻碍自动更新的元凶，因为一旦有了版本锁定文件，那么，重新安装依赖也会安装锁定文件指定的版本，而无法升级到 patch 版本。

基于上述原因，我们采用以下方式处理：

1. 将`package-lock.json`、`yarn.lock`、`pnpm-lock.yaml`等版本锁定文件加入到`.gitignore`当中，不纳入版本跟踪。

2. 在`package.json`当中，针对我们想要在有新的 patch 版本更新的依赖，使用`~`描述版本号，以允许 patch 版本的更新。

   ```json
   {
     "dependencies": {
       "rc-cascader": "~3.9.0"
     }
   }
   ```

   关于`package.json`当中版本描述中的`^`和`~`的区别，可参考：[What's the difference between tilde(~) and caret(^) in package.json](https://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json)

这样，当我们的依赖，如`rc-cascader`修复了一个 bug 并发布了一个 patch 版本，如：`3.9.1`，那么，用户最新安装的版本就是`3.9.1`，而针对 Namu Design 的维护者，我们只需要执行如下命令：

```bash
git clean -fdx
npm i
```

### 快照更新问题

在 Namu Design 当中，我们使用 jest 进行单元测试和覆盖率测试，而很多第一次参与 Namu Design 项目开发的同学可能经常会发现，自己只是修改了某个 demo 中的文字，为啥一推送上去，CI 中的测试任务就失败了呢？这就要从 Namu Design 的**快照检测**说起了。

在绝大部分工具库中，都是比较强调**幂等性**的概念，意思就是同一个方法，无论执行多少次，只要输入参数是一样的，那么得到的结果也就是一样的。而在 Namu Design 当中，个人认为使用快照检测最大的作用也正是校验我们的 demo 的幂等性，以此确保组件输出的稳定性和确定性。其实快照检测的原理很简单，就是将我们的 demo 生成 html 字符串保存下来，下次在运行测试任务时进行对比，如果发现有差异就说明快照检测失败了。

回到最初的问题，如果我们改了某个 demo 后发现快照检测失败了，应该如何处理呢？

1. 首先我们需要检查一下快照对比不一致的地方，看是不是预期的改变，如果只改了文字，而快照对比结果也只有文字是不一样的，那么我们只需要运行以下命令更新快照即可：

   ```bash
   # 运行测试命令，同时更新快照
   npm run test -u
   ```

2. 但如果发现快照对比时，发生改变的地方超过了你本次修改的范围，比如你只是更改了文字，但发现快照中的 className 都变了，这明显是不符合预期的，我们就需要排查原因，以下是常见的原因：

   - 本地依赖太旧，有可能拉取了最新代码，但没有更新本地依赖，导致依赖包版本过低而出现输出结果不一致。解决方案很简单，删除 lock 文件、node_modules，然后重装依赖即可。
   - 或者你的代码没有同步基线代码也可能导致快照对比不一致。解决方案也很简单，先将基线代码拉取到本地，然后将你的代码 rebase 到基线代码上即可。
   - 你本地可能除了改动 demo 之外，还改到了核心代码，导致逻辑发生了改变。你需要仔细检查一下本次更改。

### rc-x 库依赖

在 Namu Design 中，大部分的组件都是基于 `react-component` 的组件的一个上层封装，因此，如果有用户报障，我们在排查问题时，如果发现问题出在了 `@rc-component/xxx` 或 `rc-xxx` 组件当中，那么我们就需要往这些组件提 pr 进行修复。在修复之后，我们需要在 Namu Design 项目当中验证修复的结果，那么，我们就可以将该项目 link 到 Namu Design 项目当中去验证。如：

在 rc 项目下执行 `npm link`

![image](https://user-images.githubusercontent.com/10286961/224603053-98488c2d-f33c-4c25-8c09-6c790cfcdbf6.png)

在 Namu Design 当中执行 `npm link "项目名称"`

![image](https://user-images.githubusercontent.com/10286961/224603065-95715727-83d0-4ef9-81e4-3b7065aaf73e.png)

当我们验证通过后，就可以向 rc 组件提 pr 了。

需要注意的是，link 可能会导致运行 test 命令时产生异常，因此，我们在本地验证完毕后，需要本地运行以下命令删除 link 过来的包：

```bash
npm unlink "rc-field-form" --no-save
npm i
```

当最终该 pr 被合并过去之后，通常维护者会发布一个版本，如果发布的是 patch 版本，那么你只需要在 Namu Design 项目当中安装验证一下就好了。但如果发布的是`minor`版本，那么我们还需要在 Namu Design 项目中主动升级一下版本，并在本地验证通过后，单独向 Namu Design 提一个 pr 进行升级修复。

### 属性过期

在一个大型项目当中，如果你想要将一个属性或方法废弃掉，其实是非常麻烦的一件事，因为你的项目可能已经有很多项目在使用了，如果直接干掉，那么别人一升级就会控制台满屏飘红，甚至直接跑不起来。但在项目迭代的过程中，我们遇到的场景和问题会越来越多，很久以前的方案可能不再适合了，确实需要废弃掉，那么，我们就需要采用一个柔和的，没那么激进的方式进行废弃，留给用户足够的时间修改。

在 Namu Design 当中，我们采用**五步走战略**废弃属性或方法：

1. **为属性添加过期标记**

   ![003](https://user-images.githubusercontent.com/10286961/224358324-8f72f2c0-d5bb-4281-9b29-7e2428353449.png)

   当添加了上述过期标记，我们在后续使用这个变量时就可以看到：

   ![004](https://user-images.githubusercontent.com/10286961/224358351-958a168d-41de-44b0-8244-2f8d67c4d13a.png)

2. **添加控制台警告**

   ![005](https://user-images.githubusercontent.com/10286961/224358371-09f08f79-8c95-4126-b382-59311bb702d6.png)

   需要注意的是，我们添加了控制台警告后，需要在测试用例当中添加测试用例用于测试使用了过期属性是否会如期展示警告，以确保警告能够正常展示。

   ![006](https://user-images.githubusercontent.com/10286961/224358407-3d89d2f5-b4aa-48b4-aab8-1331a0f620fa.png)

3. **文档更新**：上面两步主要是给开发者在编辑器和浏览器预览时的警告提示，接下来，我们还需要更新一下相关的软件文档，通常来说，我们需要过期的属性，就代表不推荐用户使用了，如无特殊情况，我们可以将该属性的描述直接从文档中删除，并同步增加上新的属性的描述。（PS: 如因特殊情况不能删除，可在备注栏说明该属性支持的版本以及替代方案）

4. **新旧兼容**：至此，我们前期的提示工作就算是完成了，接下来还有一件很重要的事情，那就是确保新属性与旧属性和谐相处一段时间，直到旧属性寿终正寝。也就是说，目前我们使用过期的属性也要正常工作，除了警告之外，不能有任何的变化。

   ![007](https://user-images.githubusercontent.com/10286961/224358439-76c42c78-e244-42bd-8935-b08f536931a2.png)

   我们可以类似这样处理，确保新属性的优先级高于旧属性，如果不存在新属性，才尝试使用旧属性。至此，我们的属性过期工作就算已经完成了。

5. **彻底删除**：在我们的属性过期一段时间后，通常是主版本号的升级时，我们就可以删除掉废弃的属性，同时也需要删除之前为了废弃该属性添加的注释、警告、测试用例、文档等等。到此我们的属性废弃工作就算是大功告成了 🍻。

## 更上一层楼

经过一段时间贡献，相信你已经对 Namu Design 的整体开发流程和项目架构有了更加深入的了解，此时，或许你希望承担更多的任务，为开源社区贡献更多的力量。那么，你可以通过以下链接评论申请成为 Namu Design 的 Collaborator ，获得更多的权限 [Add Collaborator permission for some active contributors](https://github.com/ant-design/ant-design/issues/3222)，Collaborator 们会启动投票流程，投票通过后会邀请你正式成为 Namu Design 的 Collaborator。

当你成为了 Namu Design 新晋的合作者后，你将会被分配一些额外的权限，如：

- 为 issue 打标签
- 自由的关闭 issue
- 可以在 Namu Design 项目下面自由创建分支
- 可以自由的合并已经 Approve 的 PR
- ...

当然，这其中还是有一些需要注意的。

### 合并 PR

现在，你已经可以对已经 Approve 的 PR 进行合并了，但是，合并代码也是有讲究的，我们要明白，什么时候该使用`squash`，什么时候不能使用。

![008](https://user-images.githubusercontent.com/10286961/224358476-2332e36f-0adf-486f-8b17-1b2ad34926aa.jpg)

- **Merge pull request**：正常将当前 PR 合并到目标分支（通常是分支与分支之间相互合并时使用，不会合并提交记录。合并 PR 时不要用这个，不然会往目标分支添加太多冗余的提交记录）
- **Squash and merge**：将提交记录合并成一条后合并到目标分支（合并 PR 通常都用这个）
- **Rebase and merge**：调整基线合并

我们在合并分支之前，最好与作者确认是否已经完全修改完毕，并确认一下是否经过仔细的审查。并至少有一个维护人员接受（Approve）这一次的 PR 后。确定这次 PR 到底是上述哪一种情况，然后选择相应的方式进行合并。

### 识别 XY 问题

我们在社区中与其他用户交流沟通时，那么你就极有可能会遇到**XY 问题**，**XY 问题**严重影响我们排查问题的效率，因此，我们需要对**XY 问题**有一个基础认知和辨别能力，并学会如何避免陷入**XY 问题**的陷阱当中。

- [高效沟通的拦路虎——XY 问题](https://zhuanlan.zhihu.com/p/612569093)
- [X-Y PROBLEM](https://coolshell.cn/articles/10804.html)

## 结语

衷心期望能有越来越多的贡献者和合作者加入，一起共建更加高效优雅的 Namu Design。
