import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
/**
 * User representing a user
 * @property {username} String User's username
 * @property {password} String User's password
 * @property {firstName} String User's first name
 * @property {lastName} String User's last name
 * @property {email} String User's email
 * @property {profilePhoto} String User's profile photo
 * @property {headerImage} String User's header image
 * @property {accountType} String User's account type
 * @property {maritalStatus} String User's marital status
 * @property {biography} String User's biography
 * @property {dateOfBirth} Date User's date of birth
 * @property {joined} Date User's joining date
 * @property {location} Location Location is defined by a latitude and a longitude
 */
export default class User{
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}