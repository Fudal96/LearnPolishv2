

using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Core.Services.Email;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    // In order to create an extension method we need to make the class Static
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
        {
            // We need to get a connection string from configuration
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IPaymentService, PaymentService>();
            services.AddSingleton<IEmailSender, EmailSender>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        

            return services;
        }
    }
}