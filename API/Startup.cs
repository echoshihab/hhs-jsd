using System;
using System.Collections.Generic;
using System.Text;
using API.Middleware;
using Application.Interfaces;
using Application.Patients;
using FluentValidation.AspNetCore;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<DataContext>(opt =>
            {
                // opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
                opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddControllers().AddFluentValidation(cfg =>
            {
                cfg.RegisterValidatorsFromAssemblyContaining<Create>();
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddCors();

            //Identity Configs
            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();

            //jwt configs
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<String>("TokenKey")));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();

            // if (env.IsDevelopment())
            // {
            //     app.UseDeveloperExceptionPage();
            // }


            app.UseRouting();

            app.UseCors(policy =>
           {
               policy
               .AllowAnyHeader()
               .AllowAnyMethod()
               .WithOrigins("http://localhost:3000");
           });

            app.UseAuthentication();
            app.UseAuthorization();



            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
