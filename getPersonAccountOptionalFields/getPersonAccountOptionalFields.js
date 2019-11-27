import { LightningElement, api, track, wire } from 'lwc';

/* eslint-disable no-console */

// getRecord wire service
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

// fields to query via the getRecord wire method
import ACCOUNT_PERSONCONTACTID_FIELD from '@salesforce/schema/Account.PersonContactId';
import ACCOUNT_FIRSTNAME_FIELD from '@salesforce/schema/Account.FirstName';
import ACCOUNT_LASTNAME_FIELD from '@salesforce/schema/Account.LastName';
const ACCOUNT_FIELDS = [ACCOUNT_PERSONCONTACTID_FIELD, ACCOUNT_FIRSTNAME_FIELD, ACCOUNT_LASTNAME_FIELD];

// fields to query via the getRecord wire method
import ACCOUNT_CLASSIFICATION_FIELD from '@salesforce/schema/Account.Classification__pc'; // no response will return for this field
//import ACCOUNT_CLASSIFICATION_FIELD from '@salesforce/schema/Contact.Classification__c'; // this doesn't work either
const ACCOUNT_OPTIONAL_FIELDS = [ACCOUNT_CLASSIFICATION_FIELD];

export default class getPersonAccountOptionalFields extends LightningElement {

    // the record id of the page this is embedded on
    @api recordId;

    // person account fields using optionalFields to get the custom fields from contact object
    @track personContactId;
    @track firstName;
    @track lastName;
    @track classification;
    
    @wire(getRecord, {
        recordId: '$recordId',
        fields: ACCOUNT_FIELDS,
        optionalFields: ACCOUNT_OPTIONAL_FIELDS
    }) wiregetRecordAccount({error, data}) {
    
        console.log('getPersonAccountOptionalFields.getRecordAccount wire method called');
    
        if (error) {
    
            console.log('getPersonAccountOptionalFields.getRecordAccount: error: ', JSON.stringify(error));
    
        } else if (data != undefined && data != null) {
            
            console.log('getPersonAccountOptionalFields.getRecordAccount: data: ', JSON.stringify(data));

            this.personContactId = getFieldValue(data, ACCOUNT_PERSONCONTACTID_FIELD);
            this.firstName = getFieldValue(data, ACCOUNT_FIRSTNAME_FIELD);
            this.lastName = getFieldValue(data, ACCOUNT_LASTNAME_FIELD);

            // this does nothing because no response is returned for this field
            this.classification = getFieldValue(data, ACCOUNT_CLASSIFICATION_FIELD);
        }
    }

}