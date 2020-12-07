using System;

namespace Domain
{
    public class Patient
    {

        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public long HealthCardNumber { get; set; }
        public string VersionCode { get; set; }
    }

}
