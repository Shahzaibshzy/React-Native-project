using Microsoft.EntityFrameworkCore;
using serverDotNet.Data;
using Microsoft.Extensions.Options;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.Configure<CorsSettings>(builder.Configuration.GetSection("CorsSettings"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactNative", corsBuilder =>
    {
        // This will be injected by the DI container into the middleware
        corsBuilder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseCors(policy =>
{
    // Inject IOptions<CorsSettings> and get AllowedOrigins from configuration
    var allowedOrigins = app.Services.GetRequiredService<IOptions<CorsSettings>>().Value.AllowedOrigins;

    policy.WithOrigins(allowedOrigins) // Apply the allowed origins
          .AllowAnyMethod()
          .AllowAnyHeader()
          .AllowCredentials();
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactNative");
app.UseAuthorization();
app.MapControllers();
app.Run();


public class CorsSettings
{
    public string[] AllowedOrigins { get; set; }
}