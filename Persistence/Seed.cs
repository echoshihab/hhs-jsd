using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
         UserManager<AppUser> userManager)
        {

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "admin",
                        UserName = "admin",
                        Email = "admin@email.com"
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "user",
                        UserName = "user",
                        Email = "user@email.com"
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "test",
                        UserName = "test",
                        Email = "test@email.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Account1!");
                }
            }
            if (!context.Patients.Any())
            {
                var patients = new List<Patient>
                {
                    new Patient
                    {
                        FirstName = "AFName",
                        LastName = "ALName",
                        DateOfBirth = DateTime.Now.AddYears(-20).AddDays(15),
                        Gender = "Female",
                        HealthCardNumber  = 1111111111,
                        VersionCode = "AA",

                    },
                    new Patient
                    {
                        FirstName = "BFName",
                        LastName = "BLName",
                        DateOfBirth = DateTime.Now.AddYears(-30),
                        Gender = "Male",
                        HealthCardNumber  = 2222222222,
                        VersionCode = "BB",

                    },

                    new Patient
                    {
                        FirstName = "CFName",
                        LastName = "CLName",
                        DateOfBirth = DateTime.Now.AddYears(-40).AddMonths(5).AddDays(3),
                        Gender = "Male",
                        HealthCardNumber  = 3333333333,
                        VersionCode = "CC",

                    },

                    new Patient
                    {
                        FirstName = "DFName",
                        LastName= "DLName",
                        DateOfBirth = DateTime.Now.AddYears(-45),
                        Gender="Unspecified",
                        HealthCardNumber = 444444444,
                        VersionCode = "DD"

                    },
                    new Patient
                    {
                        //null gender
                        FirstName = "EFName",
                        LastName= "ELName",
                        DateOfBirth = DateTime.Now.AddYears(-50).AddDays(-4),
                        HealthCardNumber = 5555555555,
                        VersionCode = "EE"



                    },

                    new Patient
                    {
                      FirstName = "FFName",
                      LastName = "FLName",
                      DateOfBirth = DateTime.Now.AddYears(-64).AddMonths(5),
                      HealthCardNumber = 6666666666,
                      VersionCode = "FF"
                    },


                };

                await context.Patients.AddRangeAsync(patients);
                await context.SaveChangesAsync();
            }
        }
    }
}