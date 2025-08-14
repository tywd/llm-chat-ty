# 项目注意事项

## ⚠️ 重要提醒

### 1. 环境配置
- **Node.js版本**: 需要 v18+ (推荐 v20)
- **包管理器**: 必须使用 pnpm (已配置在 package.json 中)

### 2. 部署前检查清单
- [ ] 所有测试通过 (`pnpm test:run`)
- [ ] 构建成功 (`pnpm build`)
- [ ] 环境变量已配置
- [ ] 代码已通过 ESLint 检查

### 3. GitHub Secrets 配置
必须配置的 Secrets：
- `VERCEL_TOKEN`: Vercel 访问令牌
- `VERCEL_ORG_ID`: Vercel 组织 ID
- `VERCEL_PROJECT_ID`: Vercel 项目 ID

### 4. 测试注意事项
- **测试文件命名**: 必须使用 `.test.ts` 或 `.spec.ts` 后缀
- **测试位置**: 与源文件同目录的 `__tests__/` 文件夹
- **全局变量**: 使用 Vitest 的 `describe`, `it`, `expect`，不需要导入

### 5. 常见错误及解决

#### ❌ Error: Cannot find type definition file for 'node'
**解决**: 安装 `@types/node`
```bash
pnpm install --save-dev @types/node
```

#### ❌ Error: Cannot find package '@jest/globals'
**解决**: 使用 Vitest 的 API，替换导入
```typescript
// ❌ 错误
import { describe, it, expect } from '@jest/globals'

// ✅ 正确
import { describe, it, expect } from 'vitest'
```

#### ❌ Error: Jest worker encountered 3 child process exceptions
**解决**: 已切换到 Vitest，此问题不再存在

### 6. 分支策略
- `main`: 生产分支，自动部署
- `develop`: 开发分支
- `feature/*`: 功能分支，PR 到 develop

### 7. 性能优化
- **构建优化**: 使用 Vite 的预构建功能
- **测试优化**: 使用 Vitest 的并发测试
- **部署优化**: Vercel 的边缘网络

### 8. 监控指标
- 构建时间 < 2 分钟
- 测试运行时间 < 30 秒
- 覆盖率 > 80%

### 9. 回滚策略
- 保留最近 10 个部署版本
- 一键回滚到任意历史版本
- 部署前自动备份

### 10. 开发规范
- 代码风格: ESLint + Prettier
- 提交规范: Conventional Commits
- 测试规范: 单元测试覆盖率 > 80%