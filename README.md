# DynamicTabForm

This project based on the examples of <a href="https://angular.io/guide/dynamic-form?" target="_blank">Angular Dynamic Forms</a> version 6.0.8.
Both dynamic registers and input fields are generated on the fly. 
In this example a login and a register mask is created based on the construction plans stored under **'assets/form_*\<maskname>*.json'**. 
The registers and fields are created and displayed dynamically.

* metadata determine the structure of registers and fields
* creating on the fly without changing the application code
* build only once for different forms

## Demo

Have a look at the demo from this <a href="https://stackblitz.com/github/berndmartin/dynamic-tab-form" target="_blank">code</a>.

## Operation principle

The registers and fields to be created are transferred to the service (questionService). 
This service takes over the task of generating the form on the basis of the values.

```json
{
  "fields": [...],
  "tabs": [...]
}
```

### register.component.ts

```javascript
import {QuestionService} from '../param-form/question/question.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [QuestionService]
})
export class RegisterComponent implements OnInit {

  questiontabs: any[] = null;

  ngOnInit() {
    this.questionService
      .getTabs('register')
      .subscribe(data => {
        this.questiontabs = data;
      });
  }
}

```



## Example 'assets/form_*register*.json'

The **'assets/form_rgister.json'** file consits of two object arrays. These are the objects **fields** and **tabs**.

```json
{
  "fields": [
    {
      "value": "",
      "key": "firstname",
      "label": "First name",
      "required": false,
      "order": 0,
      "controlType": "TextboxQuestion",
      "type": "text",
      "options": [],
      "tabGroup": 0,
      "syncValidators": [
        "required",
        "minLength:2",
        "maxLength:30",
        "RegisterValidator:notEmptyValidator"
      ],
      "asyncValidators": []
    },
    ...
    {
      "value": "",
      "key": "newsletter",
      "label": "Subscribe to newsletter",
      "required": false,
      "order": 200,
      "controlType": "CheckboxQuestion",
      "type": "checkbox",
      "options": [],
      "tabGroup": 2,
      "syncValidators": [
      ],
      "asyncValidators": [
      ]
    }
  ],
  "tabs": [
    {
      "id": 0,
      "title": "Step 1",
      "subtitle": "Register now",
      "buttonnext": "Next personal data",
      "order": 0
    },
    ...
  ]
}

``` 


## The object **fields**

Object | Description | Type | Options
--- | --- | --- | ---
value | start/default value | any |
key | identifier of the field, return object field name | string
label | label of the input field | string
required | optional | boolean
order | sort order of fields | number 
controlType | | string | TextboxQuestion, CheckboxQuestion, DropdownQuestion
type | HTML 5 type | string | text, email, password, checkbox
options | options for DropdownQuestion | Array\<any\> | 
tabGroup | field is displayed in register | number | 
synValidators | synchronous validators  | Array\<string\> | required, notEmptyValidator, requiredTrue, email, minLength, maxLength, pattern, RegisterValidator(nameLetterValidator, passwordRequieresValidator)
asynValidators | asynchronous validators | Array\<string\> |  BlacklistValidator, MatchOtherValidator, StartWithValidator

### synchronous Validatoren

Validator name | Description | options
--- | --- | --- 
required | indicates field as required | -/-
notEmptyValidator | field must not be empty | -/-
requiredTrue | checkbox must be selected (only available on checkbox) | -/-
email | email validator of Angular | -/-
minLength | the minimum length of the field, syntax minLength\:6 | minLength:\<number>
maxLength | the maximum length of the field, syntax maxLength\:30  | maxLength:\<number>
pattern | pattern validator, example | pattern:\<string>
RegisterValidator | static validators of RegisterValidator | RegisterValidator:nameLetterValidator *or* RegisterValidator:passwordRequiresValidator 

### asynchronous Validatoren

Validator name | Description | options
--- | --- | --- 
BlacklistValidator | based on the environment constant *enviroment.blacklist* | -/-
MatchOtherValidator | field that should match another field, example: MatchOtherValidator\:password | MatchOtherValidator:\<string>
StartwithValidator | field should begin with a string, example StartwithValidator\:42 | StartwithValidator:\<string>


## The object of the **tabs** array

| Object | Description | Type
| -------| ------------ | ---
| id | identifier | number
| title | titel of the tab/register | string
| subtitle  | subtitle of the tab/register | string
| buttonnext | title of the button, performs the next step | string
| order | sort order of registers | number |


