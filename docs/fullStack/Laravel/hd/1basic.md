# 一. 开发环境和基础知识

## 1. 安装

1. 安装mysql: 官网footer->Community Servers选择mac arm下载
2. 安装Herd: <https://herd.laravel.com/>

## 2. composer 安装与镜像指引

url:<https://developer.aliyun.com/composer>

```bash
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/ # 设置镜像
composer config -g --unset repo.packagist # 取消镜像

```

## 3. 使用laravel命令安装项目

```bash
composer global require laravel/installer
laravel new example-app
cd example-app
php artisan serve

composer create-project --prefer-dist laravel/laravel php-admin "9.*" # 用来安装不同版本的laravel，可在herd中显示
```

## 4. valet配置laravel项目

## 5. vscode使用建议

PHP IntelliSense PHP
PHP Intelephense
PHP Extension Pack PHP 扩展集合
PHP Debug PHP 调试插件
php cs fixerPHP 代码格式化插件
Laravel Blade Snippets
laravel-goto-controller
Laravel 代码片段
Laravel Artisan

## 6. mysql客户端软件选择

1. 安装mysql: 官网footer->Community Servers选择mac arm下载密码：admin8888
2. sequel ace

```bash
brew install --cask sequel-ace
```

## 7. api接口测试软件apifox

## 8. 路由理解

1. /routes/web.php  // 路由文件
2. /resources/views/welcome.blade.php // 视图文件

> 访问：<http://laravel.test/a>

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('a', function () {
    return 'abc';
});
```

## 9. 数据迁移Migrate

> 编辑.env

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=admin-php
DB_USERNAME=root
DB_PASSWORD=admin8888
```

:::tip

```bash
 php artisan migrate # 运行命令,建立数据表
 php artisan migrate:rollback # 回滚命令
 php artisan migrate:refresh # 回滚并重新执行命令
 php artisan migrate:refresh --seed  # 刷新数据库并运行所有数据库种子...
 php artisan list # 查看命令
```

:::

1. /database/migrations/2022_10_24_090947_create_users_table.php

## 10. 定义zshrc别名

```bash
vim ~/.zshrc
source ~/.zshrc
```

```bash
# php
alias pa="php artisan "
alias pu="php artisan test"
```

## 11. 测试的基本使用

> /tests/Feature/ExampleTest.php

:::tip

```bash
pa make:test RegisterTest # 生成测试文件/tests/Feature/RegisterTest.php
./vendor/bin/phpunit # 运行测试
pa test
./vendor/bin/phpunit tests/Feature/RegisterTest.php # 测试特定文件
brew install phpunit # 安装phpunit
```

- 如果brew安装phpunit失败的话，使用自动安装

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

:::

## 12. 控制器模型的使用

:::tip

```bash
pa install:api  # 安装 api路由，创建/routes/api.php laravel11需要
pa make:controller RegisterController # 创建控制器，在app/Http/Controllers/RegisterController.php
```

:::

> /database/migrations/0001_01_01_000000_create_users_table.php

```php
 $table->string('name')->nullable(); // 可为空
 $table->string('email')->unique(); // 唯一性
```

## 13. 跑通单元测试

> /tests/Feature/RegisterTest.php

```php
<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    /**
     * 用户注册
     * @test
     */
    public function userRegister()
    {
        $response = $this->post('/api/register', [
            'email' => '2300071698@qq.com',
            'password' => 'admin',
        ]);
        $response->assertStatus(201);
        // $response->assertSee('@ii');
        // $response->assertSee('33');
    }
}
```

> /routes/api.php

```php
<?php

use App\Http\Controllers\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', RegisterController::class);

```

> /app/Http/Controllers/RegisterController.php

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = User::create([
            'email' => $request->email,
            'password' => $request->password,
        ]);
        return $user;
    }
}

```

## 14. 单元测试时数据初始化

- 因email的唯一性，当重复测试时发生错误，此时 可用`use RefreshDatabase`清空数据库

> /tests/Feature/RegisterTest.php

```php
class RegisterTest extends TestCase
{
    use RefreshDatabase;
}
```

## 15. 数据填充的使用

url: <https://github.com/fzaninotto/Faker>
url: <https://doc.houdunren.com/%E6%8F%92%E4%BB%B6%E6%89%A9%E5%B1%95/Laravel/5%20faker.html>

- /database/factories/UserFactory.php // 数据填充文件
- /database/seeders/DatabaseSeeder.php // 数据填充入口文件

```php
<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(20)->create(); // 使用/database/factories/UserFactory.php工厂文件填充数据

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call([ // 使用UserSeeder文件来填充数据
            UserSeeder::class
        ]);
    }
}
```

:::tip

```bash
pa db:seed # 添加数据命令,会调用/database/seeders/DatabaseSeeder.php文件,再通过$this->call([UserSeeder::class])调用UsersSeeder.php文件;
pa make:seeder UserSeeder # 生成数据User单独填充文件/database/seeders/UserSeeder.php
```

:::

- /database/seeders/UserSeeder.php

```php
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(20)->create();
        $user = User::first();
        $user->name = '向军大叔1';
        $user->email = '2300071698@qq.com';
        $user->save();
    }
}

```

## 16. 使用apifox测试接口

1. 测试环境
2. body(form-data)->email,password
3. 返回响应201
4. 校验成功201

## 17. apifox生产接口文档

1. 分享文档
2. 提取到"响应实例"

## 18. 独立设置phpunit数据库

- 当使用`use RefreshDatabase;`时，每次都会初始化数据库. 可注释掉，并独立设置数据库admin_php_test,进行测试时只正对该数据库操作

1. /phpunit.xml中

  ```xml
    <env name="DB_CONNECTION" value="mysql_php_test"/>
    <env name="DB_DATABASE" value=":memory:"/>
  ```

2. /config/database.php中

- 复制mysql配置，并修改名称为mysql_php_test

```php
        'mysql_php_test' => [
            'driver' => 'mysql',
            'url' => env('DB_URL'),
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => 'admin_php_test',
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => env('DB_CHARSET', 'utf8mb4'),
            'collation' => env('DB_COLLATION', 'utf8mb4_unicode_ci'),
            'prefix' => '',
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
```

1. 运行测试命令

- 新建数据库admin_php_test
- 此时运行的测试pu将针对admin_php_test数据库

:::tip

```bash
pu # 对新数据库 admin_php_test进行测试操作,更新admin_php_test数据库结构
pu tests/Feature/LoginTest.php # 对单独文件进行测试 添加“use RefreshDatabase;”可实现数据迁移,数据填充可见第二章

pa migrate:refresh --seed # 对原数据库admin_php进行初始哈并填充数据操作
```

:::

## 19. 注册邮箱单元测试

- /tests/Feature/RegisterTest.php
- 在注释中需要写@test

```php
    use RefreshDatabase;
    protected $data = [
        'email' => '2300071698@qq.com',
        'password' => 'admin',
    ];
    /**
     * 用户注册
     * @test
     */
    public function userRegister()
    {
        $response = $this->post('/api/register', $this->data);
        $response->assertStatus(201);
        // $response->assertSee('@ii');
        // $response->assertSee('33');
    }
    /**
     * 非法邮箱验证
     * @test
     */
    public function registerEmailValidate()
    {
        // $this->withoutExceptionHandling(); // 关闭异常处理
        $response = $this->post('/api/register', ['email' => 'hd'] + $this->data);
        $response->assertSessionHasErrors('email'); // 验证邮箱格式错误信息
    }
    /**
     * @test
     */
    public function EmailRequiredValidate()
    {
        $data  = $this->data;
        unset($data['email']);
        $response = $this->post('/api/register', $data);
        $response->assertSessionHasErrors('email'); // 验证邮箱是否填写 
    }
    /**
     * @test
     */
    public function  EmailUniqueValidate()
    {
        $response1 = $this->post('/api/register', $this->data);
        $response2 = $this->post('/api/register', $this->data);
        $response2->assertSessionHasErrors('email'); // 验证邮箱是否唯一
    }
```

- /app/Http/Controllers/RegisterController.php

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users', // 验证邮箱必须，格式是否正确，是否唯一
            'password' => 'required|min:3', // 验证密码是否填写，长度是否大于3
        ]);
        $user = User::create([
            'email' => $request->email,
            'password' => $request->password,
        ]);
        return $user;
    }
}

```

## 20. 邮箱唯一性单测

## 21. 登录单元测试

- Hash::make('admin8888') 使用hash生成admin8888的密码

:::tip

```bash
pa make:controller LoginController # 新建Login控制器
pa make:test LoginTest # 新建Login测试文件
```

:::

- /routes/api.php

```php
// Route::post('login', LoginController::class);
Route::post('login', [LoginController::class, 'handler']);
```

- /app/Http/Controllers/LoginController.php

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    // public function handler() {}
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:3']
        ]);
        $user = User::where('email', $request->email)->first();
        if (!$user || Hash::check($request->password, $user->password)) {
        }
    }
}
```

> /tests/Feature/LoginTest.php

- 可使用@test或者使用它test_来命名测试方法，@test方法可以省略test_前缀

```php
<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;
    protected $data = [
        'email' => '2300071698@qq.com',
        'password' => 'admin8888',
    ];
    /**
     * @test
     */
    public function userLogin(): void
    {
        $user = User::factory()->create();
        $response = $this->post('/api/login', ['email' => $user->email, 'password' => 'admin8888']);

        $response->assertOk();
    }

    public function test_loginEmailRule(): void
    {
        $response = $this->post('/api/login', ['email' => 'hd', 'password' => 'admin8888']);

        $response->assertSessionHasErrors('email');
    }

    public function test_emailRequireRule()
    {
        $response = $this->post('/api/login', ['password' => 'admin8888']);
        $response->assertSessionHasErrors('email');
    }
}


```

## 22. 密码输入错误单测

- 创建处理验证的文件，使验证规则可以复用

:::tip

```bash
pa make:request LoginRequest # 创建app/Http/Requests/LoginRequest.php
```

:::

> app/Http/Requests/LoginRequest.php

```php{14,25-26}
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'password' => ['required', 'min:3']
        ];
    }
}

```

> app/Http/Controllers/LoginController.php

```php{3-8}
    public function __invoke(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => '用户不存在'
            ]);
        }
        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => '密码输入错误'
            ]);
        }
        
    }
```

> tests/Feature/LoginTest.php密码输入错误验证

```php
/**
 * @test
 */
public function passwordPostWrong()
{
    $user = User::factory()->create();
    $response = $this->post('/api/login', ['email' => $user->email, 'password' => 'hd888']);
    $response->assertSessionHasErrors('password');
}
/**
 * 检查邮箱是否存在
 * @test
 */
public function emailNotExists()
{
    $response = $this->post('/api/login', ['email' => '2424@qq.com', 'password' => 'hd888']);
    $response->assertSessionHasErrors('email');
}
```

## 23. apifox测试登录接口

## 24. 登录成功返回token

> app/Http/Controllers/LoginController.php

```php
class LoginController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            throw ValidationException::withMessages([
                'email' => '用户不存在'
            ]);
        }
        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => '密码输入错误'
            ]);
        }
        return [
            'user'  => $user,
            'token' => $user->createToken('auth')->plainTextToken
        ];
    }
}
```

> app/Models/User.php如果没有添加HasApiTokens的话返回token时出错

```php
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;
}
```

> tests/Feature/LoginTest.php

```php
    /**
     * 请求成功，返回201
     * @test
     */
    public function userLogin(): void
    {
        $user = User::factory()->create();
        $response = $this->post('/api/login', ['email' => $user->email, 'password' => 'admin8888']);

        // $response->assertOk();
        $response->assertSee('token');
    }
```

## 25. 添加手机注册

:::tip

```bash
pa make:request RegisterRequest # 创建app/Http/Requests/RegisterRequest.php注册的表单验证
puf userRegister
php artisan test --filter userRegister
```

:::

- filter_var(request('account'), FILTER_VALIDATE_EMAIL)验证是否是邮箱

## 26 确认密码测试

- 登录可以使用邮箱或手机 account->email,mobile
- 把原来的email换成account

> app/Http/Controllers/RegisterController.php

```php
    public function __invoke(RegisterRequest $request)
    {
        $fieldName = filter_var($request->account, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
        $user = User::create([
            $fieldName => $request->account,
            'password' => Hash::make($request->password),
        ]);
        return [
            'user'  => $user,
            'token' => $user->createToken('auth')->plainTextToken
        ];
    }
```

> app/Http/Requests/RegisterRequest.php

```php
    public function rules()
    {
        return [
            'account' => $this->accountRule(),
            'password' => ['required', 'min:3', 'confirmed'],

        ];
    }
    protected function accountRule()
    {
        if (filter_var(request('account'), FILTER_VALIDATE_EMAIL))
            return ['required', 'email', 'unique:users,email'];

        return ['required', 'regex:/^\d{11}$/', 'unique:users,mobile'];
    }
```

> tests/Feature/RegisterTest.php

```php{4}
   protected $data = [
        'account' => '2300071698@qq.com',
        'password' => 'admin8888',
        'password_confirmation' => 'admin8888',
    ];
    /**
     * 用户注册成功
     * @test
     */
    public function userRegister()
    {
        $response = $this->post('/api/register', $this->data);
        $response->assertOk();
        // $response->assertStatus(201);
        // $response->assertSee('@ii');
        // $response->assertSee('33');
    }
    /**
     * 非法邮箱验证
     * @test
     */
    public function registerAccountValidate()
    {
        // $this->withoutExceptionHandling();
        $response = $this->post('/api/register', ['account' => 'hd'] + $this->data);
        // $response->assertStatus(201);
        $response->assertSessionHasErrors('account');
    }
    /**
     * 帐号不能为空
     * @test
     */
    public function accountRequiredValidate()
    {
        $data = $this->data;
        unset($data['account']);
        $response = $this->post('/api/register', $data);
        $response->assertSessionHasErrors('account');
    }

    /**
     * 帐号不能重复注册
     * @test
     */
    public function  accountUniqueValidate()
    {
        $response1 = $this->post('/api/register', $this->data);
        $response2 = $this->post('/api/register', $this->data);
        $response2->assertSessionHasErrors('account');
    }
    /**
     * 确定密码输出错误
     * @test
     */
    public function determineTheErrorOutputPassword()
    {
        $this->post('/api/register', ['password' => 'abcd'] + $this->data)->assertSessionHasErrors('password');
    }
```

## 27. 修复登录测试

## 28. 测试用手机号登录

> tests/Feature/LoginTest.php

```php
    /**
     * 手机号登录
     * @test
     */
    public function loginByMobile()
    {
        $user = User::factory()->create(['mobile' => '18888888888']);
        $response = $this->post('/api/login', ['account' => '18888888888', 'password' => 'admin8888']);
        $response->assertOk();
    }
```

## 29. 配置本地邮件服务MailHog

- 使用<http://laravel.test:8025/>登录

:::tip

```bash
brew install mailhog
brew services start mailhog

pa make:notification EmailValidateCodeNotification  # 生成app/Notifications/EmailValidateCodeNotification.php邮件验证码

pa vendor:publish --tag=laravel-notifications # 生成resources/views/vendor/notifications自定义邮件模板
```

:::

> .env

```bash
MAIL_MAILER=smtp
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

> /routes/web.php
> 登录<http://laravel.test/test>

```php
Route::get('test', function () {
    return (new EmailValidateCodeNotification())->toMail(User::factory()->make());
});
```

## 30. 预览邮件通知

:::tip

```bash
composer require laravel-lang/lang:~8.0 # 中文语言包
```

:::

- 复制/vendor/laravel-lang/lang/src/zh-CN到/lang下
- 复制/vendor/laravel-lang/lang/json/zh_CN.json到/lang下

## 31. 配置多语言环境

> 邮件模板在resources/views/vendor/notifications/email.blade.php中
> 变量app/Notifications/EmailValidateCodeNotification.php中

```php
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('您的验证码是:')
            ->action('访问网站', url('/'))
            ->line('感谢订阅后盾人频道，祝您学有所成!');
    }

```

> .env

```bash
APP_TIMEZONE=PRC
APP_URL=http://laravel.test

APP_LOCALE=zh_CN
APP_FALLBACK_LOCALE=zh_CN
APP_FAKER_LOCALE=zh_CN
```

## 32. 邮件通知中文本地化

> routes/web.php通知测试
> 在<http://laravel.test:8025/>中访问

```php
Route::get('test', function () {
    Notification::send(User::factory()->make(), new EmailValidateCodeNotification(34343));
});
```

## 33. 体验邮件发送

:::tip

```bash
pa make:test GuestValideCodeTest # 创建tests/Feature/GuestValideCodeTest.php
pu tests/Feature/ValidateCode/GuestValideCodeTest.php # 单元测试
pa make:controller ValidateCodeController # 创建app/Http/Controllers/ValidateCodeController.php验证码控制器
pa make:request ValidateCodeRequest # 创建app/Http/Requests/ValidateCodeRequest.php验证码请求类

```

:::

> /routes/api.php

```php
Route::post('code/guest', [ValidateCodeController::class, 'guest']);
```

> /app/Http/Controllers/ValidateCodeController.php

```php
    public function guest(ValidateCodeRequest $request)
    {
        // $request->validate([
        //     'account' => ['required', 'email']
        // ]);
    }
```

> app/Http/Requests/ValidateCodeRequest.php

```php
    public function rules()
    {
        return [
            'account' => $this->accountRule(),
        ];
    }
    protected function accountRule()
    {
        if (filter_var(request('account'), FILTER_VALIDATE_EMAIL))
            return ['required', 'email'];

        return ['required', 'regex:/^\d{11}$/'];
    }
```

## 34. 开始进行验证码测试

> phpunit.xml

```xml
        <env name="MAIL_MAILER" value="smtp"/>
```

> app/Http/Controllers/ValidateCodeController.php

```php
    public function guest(ValidateCodeRequest $request)
    {
        $user = User::factory()->make(['email' => $request->account]);
        Notification::send($user, new EmailValidateCodeNotification(3535));
    }
```

## 35. 单元测试发送邮件

> app/Http/Controllers/ValidateCodeController.php

```php
    public function guest(ValidateCodeRequest $request, CodeService $codeService)
    {
        $codeService->send($request->account);
    }
```

> app/Services/CodeService.php 新建文件CodeService.php

```php
class CodeService
{
    protected $account;
    public function send(string|int $account)
    {
        $this->account = $account;
        $action = filter_var($account, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
        return $this->$action();
    }
    protected function email()
    {
        $user = User::factory()->make(['email' => $this->account]);
        Notification::send($user, new EmailValidateCodeNotification(36363636));
    }
    protected function mobile() {}
}

```

## 36. 提取验证码发送服务

> app/Services/CodeService.php

```php
    public function send(string|int $account)
    {
        $this->account = $account;
        $action = filter_var($account, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
        if (Cache::get($this->account)) {
            abort(403, '验证码已经发送');
        };
        return $this->$action();
    }
    /**
     * 邮箱验证码
     * @return void
     */
    protected function email()
    {
        $code = mt_rand(1000, 9999); # 随机生成4位验证码
        Cache::put($this->account, $code);
        $user = User::factory()->make(['email' => $this->account]);
        Notification::send($user, new EmailValidateCodeNotification($code));
    }
```

> tests/Feature/ValidateCode/GuestValideCodeTest.php

```php
    /**
     * 重复发送验证码
     * @test
     */
    public function repeatSendVerificationCode()
    {
        $user = User::factory()->make();
        $this->post('/api/code/guest', [
            'account' => $user->email
        ]);
        $this->post('/api/code/guest', [
            'account' => $user->email
        ])->assertStatus(403);
    }
```

## 37. 验证码重复发送限制

> /app/Services/CodeService.php

```php

class CodeService
{
    /**
     * 统一发送接口
     */
    public function send(string|int $account)
    {
        $action = filter_var($account, FILTER_VALIDATE_EMAIL) ? 'email' : 'mobile';
        if (Cache::get($account)) {
            abort(403, '验证码已经发送');
        };
        return $this->$action($account);
    }
    /**
     * 邮箱验证码
     * @return void
     */
    public function email(string $email): int
    {
        $user = User::factory()->make(['email' => $email]);
        Notification::send($user, new EmailValidateCodeNotification($code = $this->getCode()));
        Cache::put($email, $code, config('code_expire_time'));
        return $code;
    }
    protected function getCode(): int
    {
        return mt_rand(1000, 9999);
    }
    /**
     * 手机发送验证码
     * @return void
     */
    protected function mobile() {}
}
```

> /config/app.php

```php
    'code_expire_time' => env('code_expire_time', 30),
```

> .env

```bash
code_expire_time=60
```

:::tip

```bash
pa make:test ValidateCodeTest --unit # 生成/tests/Unit/ValidateCodeTest.php测试文件
```

:::

## 38. 优化验证码服务

### 38.1 通过Provider获取code实例

- apifox中Headers添加Accept: application/json

> /app/Http/Providers/AppServiceProvider.php服务提供商,可通过app('code')获取到CodeService实例

```php
    public function register(): void
    {
        $this->app->instance('code', new CodeService()); # 单例使用app('code')调用100次，也只执行一次
    }
```

> /tests/Unit/ValidateCodeTest.php

```php
    use RefreshDatabase;
    /**
     * 邮件验证码
     * @test
     */
    public function emailVerificationCode(): void
    {
        $user = User::factory()->make();
        $code = app('code')->email($user->email);
        $this->assertEquals(Cache::get($user->email), $code);
    }
```

### 38.2 修改错误提供信息

1. lang/zh-CN/validation.php

```php
        'year' => '年',
        'code' => '验证码'
```

2. app/Http/Requests/RegisterRequest.php

```php
    public function messages()
    {
        return [
            'code.required' => '验证码忘记写了吧'
        ];
    }
```

## 39. 注册时验证码校验

:::tip

```bash
pa make:rule ValidateCodeRule # 创建app/Rules/ValidateCodeRule.php
```

:::

- 使用dd('aa');来打印参数

> tests/Feature/Account/RegisterTest.php

```php
    use RefreshDatabase;
    protected $data = [
        'account' => '2300071698@qq.com',
        'password' => 'admin8888',
        'password_confirmation' => 'admin8888',
        'code' => 'dkdk'
    ];
        /**
     * 验证码输入错误
     * @test
     */
    public function captchaInputErrors()
    {
        $response = $this->post('/api/register', ['code' => '9999aa'] + $this->data);
        $response->assertSessionHasErrors('code');
    }
```

> app/Rules/ValidateCodeRule.php这个是laravel9的

```php
 public function passes($attribute, $value)
    {
        return app('code')->check(request('account'), $value);
    }
```

> app/Rules/ValidateCodeRule.php这个是laravel11的

```php
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!app('code')->check(request('account'), $value)) {
            $fail('验证码输入错误');
        }
    }
```

> 该ValidateCodeRule在RegisterRequest.php中使用

```php{6}
    public function rules()
    {
        return [
            'account' => $this->accountRule(),
            'password' => ['required', 'min:3', 'confirmed'],
            'code' => ['required', new ValidateCodeRule],

        ];
    }
```

> app/Services/CodeService.php

```php
    public function check($account,  $code): bool
    {
        return  Cache::get($account) == $code;
    }
```

## 40. 自定义验证码规则

> tests/Feature/Account/RegisterTest.php

```php
    use RefreshDatabase;

    protected function data()
    {
        $user = User::factory()->make();
        app('code')->clear($user->email);
        return [
            'account' => $user->email,
            'password' => 'admin8888',
            'password_confirmation' => 'admin8888',
            'code' => app('code')->email($user->email)
        ];
    }
    /**
     * 用户注册成功
     * @test
     */
    public function userRegister()
    {

        $response = $this->post('/api/register', $this->data());
        $response->assertOk();
        // $response->assertStatus(201);
        // $response->assertSee('@ii');
        // $response->assertSee('33');
    }
    /**
     * 验证码输入错误
     * @test
     */
    public function captchaInputErrors()
    {
        $response = $this->post('/api/register', ['code' => '9999aa'] + $this->data());
        $response->assertSessionHasErrors('code');
    }
    /**
     * 非法邮箱验证
     * @test
     */
    public function registerAccountValidate()
    {
        // $this->withoutExceptionHandling();
        $response = $this->post('/api/register', ['account' => 'hd'] + $this->data());
        // $response->assertStatus(201);
        $response->assertSessionHasErrors('account');
    }
    /**
     * 帐号不能为空
     * @test
     */
    public function accountRequiredValidate()
    {
        $data = $this->data();
        unset($data['account']);
        $response = $this->post('/api/register', $data);
        $response->assertSessionHasErrors('account');
    }

    /**
     * 帐号不能重复注册
     * @test
     */
    public function  accountUniqueValidate()
    {
        $data = $this->data();
        $response1 = $this->post('/api/register', $data);
        $response2 = $this->post('/api/register', $data);
        $response2->assertSessionHasErrors('account');
    }
    /**
     * 确定密码输出错误
     * @test
     */
    public function determineTheErrorOutputPassword()
    {
        $this->post('/api/register', ['password' => 'abcd'] + $this->data())->assertSessionHasErrors('password');
    }
```

> app/Services/CodeService.php
> app('code')->clear()清空缓存

```php
    public function clear($account): void
    {
        Cache::forget($account);
    }
```

## 41. 验证单元测试

- 在前置操作中->添加前置操作->自定义脚本->pm.environment.set('email',pm.variables.replaceIn('{{$internet.email}}'));该脚本把随机的email放到测试环境中以备下一个接口测试使用
- 目前apifox版本pm.variables.replaceIn无法使用
- 基本思路是通过运行验证码api把请求的account放到email，生成的code都放到环境变量中，以待下一个api使用。

## 42. 完善apifox接口
