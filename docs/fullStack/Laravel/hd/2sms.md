# 第二章 短信服务

## 1. 阿里云短信配置

url: <https://github.com/overtrue/easy-sms>

```bash
composer require overtrue/easy-sms
```

## 2. 短信服务初始构建

## 3. 创建迁移文件等

:::tip

```bash
pa make:model Config -a # 数据填充，迁移，工厂，模型，控制器，请求，policy,权限控制，request
  #  INFO  Model [app/Models/Config.php] created successfully.
  #  INFO  Factory [database/factories/ConfigFactory.php] created successfully.
  #  INFO  Migration [database/migrations/2024_10_14_182244_create_configs_table.php] created successfully.
  #  INFO  Seeder [database/seeders/ConfigSeeder.php] created successfully.
  #  INFO  Request [app/Http/Requests/StoreConfigRequest.php] created successfully.
  #  INFO  Request [app/Http/Requests/UpdateConfigRequest.php] created successfully.
  #  INFO  Controller [app/Http/Controllers/ConfigController.php] created successfully.
  #  INFO  Policy [app/Policies/ConfigPolicy.php] created successfully.
pa migrate:refresh --seed # 迁移并填充数据 ,mysql多了一个表configs
```

:::

> /database/migrations/2024_10_14_182244_create_configs_table.php

```php
    public function up(): void
    {
        Schema::create('configs', function (Blueprint $table) {
            $table->id();
            $table->json('site')->nullable()->comment('站点信息');
            $table->json('aliyun')->nullable()->comment('阿里云配置');
            $table->json('data')->nullable()->comment('其他配置l');

            $table->timestamps();
        });
    }
```

> /database/seeders/ConfigSeeder.php把数组存储到site字段，但字段是json格式，需要把数组转为json格式

```php
    public function run(): void
    {
        Config::create([
            'site' => [
                'name' => '后盾人',
                'tel' => 'abc',
                'icp' => '',
                'keywords' => '',
                'address' => '',
                'email' => '',
                'author' => '',

            ]
        ]);
    }
```

> database/seeders/DatabaseSeeder.php

```php
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ConfigSeeder::class, # 执行填充
        ]);
    }
```

> app/Models/Config.php

```php
class Config extends Model
{
    use HasFactory;
    protected $casts = ['site' => 'array']; # 把数组转为json格式
}
```

## 4. 网站配置更新

> routes/api.php

```php
Route::put('config/{name}', [ConfigController::class, 'update']);
```

> tests/Feature/Config/ConfigTest.php

```php
    public function updateSiteConfiguration(): void
    {
        $response = $this->put('/api/config/site', [
            'name' => '后盾人',
            'tel' => 'abcdefg'
        ]);

        $response->assertSee('abcdefg');
    }
```

> app/Http/Controllers/ConfigController.php

```php
    public function update(Request $request, string $name)
    {
        $config = Config::firstOrNew();
        $config[$name] = $request->input();
        $config->save();
        return $config[$name];
    }
```

## 5. apifox测试接口

- Body->x-www-form-urlencoded

```json
{
    "name": "意",
    "icp": "aaa",
    "tel": "sdkfjslkdf",
    "keywords": "asdfjasldkjf"
}
```

## 6. 全局配置项定义

### 6.1 读取配置项

- 读取配置项config('app.url')将读取config/app.php中的url配置项
- 读取数据库中的配置项

> /app/Providers/AppServiceProvider.php在这里把数据库中的配置项写到全局
:::tip
此时需要注意boot中执行的代码，如果代码中存在数据库操作，那么在执行boot代码时，数据库连接还没有建立，所以会报错，所以需要把数据库操作放到数据库连接成功后执行
:::

```php
    public function boot(): void
    {
        $config = Config::firstOrNew();
        config(['hd' => $config->toArray()]);
    }
```

> /routes/web.php

```php
Route::get('test', function () {
    return config('hd.site.name');
});
```

### 6.2 单元测试中的数据填充

> /tests/Feature/Config/ConfigTest.php

```php{7-8}
    /**
     * 更新站点配置
     * @test
     */
    public function updateSiteConfiguration(): void
    {
        // $this->seed();
        dd(Config::first());
        $response = $this->put('/api/config/site', [
            'name' => '后盾人',
            'tel' => 'abcdefg'
        ]);

        $response->assertSee('abcdefg');
    }
```

> tests/TestCase.php

```php
abstract class TestCase extends BaseTestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(); // 二选一
    }
}
```

## 7. laravel服务解释

:::tip

```bash
pa make:test SmsServiceTest --unit # 创建tests/Unit/SmsServiceTest.php
```

:::

> routes/web.php在config/hd.php中return['mobile'=>186]可使用config('hd.mobile')来访问

```php
Route::get('test', function () {
    dd(config('hd.mobile'));
    return config('system.site.name');
});
```

## 8. 短信配置项

> .env

```bash
# 阿里云
ALIYUN_ACCESS_KEY_ID=LTAI5***************8
ALIYUN_ACCESS_KEY_SECRET=g8Xspb**************s
ALIYUN_SMS_SIGN_NAME=阿里云短信测试
```

> tests/Unit/SmsServiceTest.php

```php
    /**
     * @test
     */
    public function sendMobileMessage(): void
    {
        $response = app('sms')->send('1777*******', 'SMS_154950909', [
            'code' => '888999',
            // 'product' => '后盾人'
        ]);
        $this->assertTrue(isset($response['aliyun']));
        // $this->assertTrue(true);
    }
```

- 头像->AccessKey管理->开始使用子用户AccessKey->添加权限->搜索sms

## 9. 短信单测发送

## 10. 测试短信发送控制器

> app/Services/CodeService.php

```php
    /**
     * 手机发送验证码
     * @return void
     */
    protected function mobile($phone)
    {
        app('sms')->send($phone, 'SMS_154950909', [
            'code' => $code = $this->getCode(),
            // 'product' => config('app.name')
        ]);
        return $code;
    }
```

> tests/Feature/ValidateCode/GuestValideCodeTest.php

```php
    /**
     * 发送手机验证码
     * @test
     */
    public function sendMobilePhoneVerificationCode()
    {
        $this->post('/api/code/guest', [
            'account' => config('hd.mobile')
        ])->assertOk();
    }
```

## 11. apifox测试用例

## 12. 配置中间与跑通单测

:::tip

```bash
pa make:middleware ConfigMiddleware # 新建文件app/Http/Middleware/ConfigMiddleware.php专门处理配置文件中间件
```

:::

### 12.1 新增配置

### 12.1.1 在ServiceProvider中

> app/Providers/AppServiceProvider.php一开始就运行该文件，如果表格未创建将出错

```php
    public function boot()
    {
        $config = Config::firstOrNew();
        config(['hd' => $config->toArray()]);
    }
```

### 12.1.2 使用中间件
>
> app/Http/Kernel.php

```php{9,22}
    protected $middleware = [
        // \App\Http\Middleware\TrustHosts::class,
        \App\Http\Middleware\TrustProxies::class,
        \Illuminate\Http\Middleware\HandleCors::class,
        \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
        \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
        \App\Http\Middleware\TrimStrings::class,
        \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
        ConfigMiddleware::class,
    ];
        protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
```

> app/Http/Middleware/ConfigMiddleware.php

```php
    public function handle(Request $request, Closure $next): Response
    {
        $config = Config::firstOrNew()->toArray();
        config(['hd.aliyun' => $config['aliyun'] ?? config('hd.aliyun')]);
        config(['hd.site' => $config['site'] ?? config('hd.site')]);
        dd(config('hd'));
        return $next($request);
    }
```

## 13. 用户登录身份验证

### 13.1 在路由中调用中间件

> routes/api.php

```php
// 1. 在单个路由后添加
 Route::put('config/{name}', [ConfigController::class, 'update'])->middleware('auth:sanctum');
// 2. 在路由组中添加
Route::middleware(['auth:sanctum'])->group(function () {
    Route::put('config/{name}', [ConfigController::class, 'update']);
});

```

### 13.2 在控制器中添加中间件

> app/Http/Controllers/ConfigController.php

```php
    public function __construct()
    {
        $this->middleware(['auth:sanctum']);
    }
```

> tests/Feature/Config/ConfigTest.php

```php
    use  RefreshDatabase;
    /**
     * @test
     */
    public function updateSiteConfiguration(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user); // 模拟用户登录

        $response = $this->put('/api/config/site', [
            'name' => '后盾人',
            'tel' => 'abcdefg'
        ]);

        $response->assertSee('abcdefg');
    }
```

## 14. 提取测试帮助函数与apifox接口token验证

> composer.json中autoload添加files

```json{7-9}
 "autoload": {
  "psr-4": {
   "App\\": "app/",
   "Database\\Factories\\": "database/factories/",
   "Database\\Seeders\\": "database/seeders/"
  },
  "files": [
   "./tests/helper.php"
  ]
 },
```

:::tip

```bash
composer dump-autoload # 重新生成自动加载文件
```

:::
> tests/helper.php

```php
<?php

function create($class, $attributes = [])
{
    return $class::factory()->create($attributes);
}
function make($class, $attributes = [])
{
    return $class::factory()->make($attributes);
}

```

> tests/Feature/Config/ConfigTest.php

```php
    public function updateSiteConfiguration(): void
    {
        // $user = User::factory()->create();
        $user = create(User::class); // 直接可以使用helper.php中的帮助函数
        $this->actingAs($user);

        $response = $this->putJson('/api/config/site', [
            'name' => '后盾人',
            'tel' => 'abcdefg'
        ]);

        $response->assertSee('abcdefg');
    }
```

## 15. 找回密码

:::tip

```bash
pa make:test ForgetPassword # or
pa make:test Account/ForgetPassword
```

:::

## 16. tinker与打印测试响应结果

:::tip

```bash
pa tinker # 进入命令行模式
```

:::

> /tests/Feature/Account/ForgetPasswordTest.php中postJson,$response->dd()的使用

```php
   use RefreshDatabase;
    /**
     * 验证表单
     * @test
     */
    public function validateForm()
    {
        // $this->withoutExceptionHandling();
        $response = $this->post('/api/account/forget-password', []);
        $response->assertSessionHasErrors(['account', 'code', 'password']);
    }
    /**
     * 账号不存在
     * @test
     */
    public function accountDoesNotExist()
    {
        $user = make(User::class);
        $response = $this->post('/api/account/forget-password', [
            'account' => $user->email
        ]);
        $response->assertSessionHasErrors(['account']);
    }
    /**
     * 找回密码
     * @test
     */
    public function retrievePassword()
    {
        $user = make(User::class); // make 创建一个用户 create 创建一个用户并保存
        $response = $this->postJson('/api/account/forget-password', [ // postJson 返回一个 json 格式的响应,post 返回一个 html 格式的响应
            'account' => $user->email,
            'code' => '',
            'password' => 'admin8888',
            'password_confirmation' => 'admin88889'
        ]);
        // $response->assertSessionHasErrors(['code']);
        $response->dd(); // dd() 打印并结束
    }
```

显示错误

```json
{#2350 // vendor/laravel/framework/src/Illuminate/Testing/TestResponse.php:1482
  +"message": "账号 不存在。 (and 2 more errors)"
  +"errors": {#2351
    +"account": array:1 [
      0 => "账号 不存在。"
    ]
    +"code": array:1 [
      0 => "验证码 不能为空。"
    ]
    +"password": array:1 [
      0 => "密码 两次输入不一致。"
    ]
  }
}
```

## 17. 找回密码控制器

> /app/Http/Controllers/ForgetPasswordController.php

```php
    public function __invoke(ForgetPasswordRequest $request)
    {
        $user = User::where(app('user')->fieldName(), $request->account)->first();
        $user->password = bcrypt($request->password);
        $user->save();
        return response(['message' => '密码修改成功']);
    }
```

> app/Providers/AppServiceProvider.php

```php
   public function register()
    {
        $this->app->instance('user', new UserService());
    }

```

## 18. api测试找回密码

## 19. 用户默认头像单测

> tests/Unit/UserTest.php

```php
    /**
     * 用户默认头像
     * @test
     */
    public function theUserTheDefaultAvatar()
    {
        $user = create(User::class);
        $this->assertEquals($user->avatar_url, url('images/avatar.jpeg'));
        // $this->assertTrue(true);
    }
```

> app/Models/User.php在user中添加avatar_url

```php
    protected $appends =  ['avatar_url'];

    public function getAvatarUrlAttribute()
    {
        return $this->avatar ?? url('images/avatar.jpeg');
    }
```
