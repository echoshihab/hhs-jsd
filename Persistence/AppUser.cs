using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

    }
}