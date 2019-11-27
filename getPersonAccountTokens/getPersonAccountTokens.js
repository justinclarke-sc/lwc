import { LightningElement, api, track, wire } from 'lwc';

/* eslint-disable no-console */

// getRecord wire service
import { getRecord } from 'lightning/uiRecordApi';

// fields to query via the getRecord wire method
import ACCOUNT_PERSONCONTACTID_FIELD from '@salesforce/schema/Account.PersonContactId';
import ACCOUNT_FIRSTNAME_FIELD from '@salesforce/schema/Account.FirstName';
import ACCOUNT_LASTNAME_FIELD from '@salesforce/schema/Account.LastName';
import ACCOUNT_INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
const ACCOUNT_FIELDS = [ACCOUNT_PERSONCONTACTID_FIELD, ACCOUNT_FIRSTNAME_FIELD, ACCOUNT_LASTNAME_FIELD, ACCOUNT_INDUSTRY_FIELD];

// fields to query via the getRecord wire method
import CONTACT_CLASSIFICATION_FIELD from '@salesforce/schema/Contact.Classification__c';
const CONTACT_FIELDS = [CONTACT_CLASSIFICATION_FIELD];

export default class getPersonAccountTokens extends LightningElement {

    // the record id of the page this is embedded on
    @api recordId;

    // person account standard fields accessible to account object
    @track personContactId;
    @track firstName;
    @track lastName;
    
    @wire(getRecord, {
        recordId: '$recordId',
        fields: ACCOUNT_FIELDS
    }) wiregetRecordAccount({error, data}) {
    
        console.log('getPersonAccountTokens.getRecordAccount wire method called');
    
        if (error) {
    
            console.log('getPersonAccountTokens.getRecordAccount: error: ', JSON.stringify(error));
    
        } else if (data != undefined && data != null) {
            
            console.log('getPersonAccountTokens.getRecordAccount: data: ', JSON.stringify(data));

            this.personContactId = data.fields[ACCOUNT_PERSONCONTACTID_FIELD.fieldApiName].value;
            this.firstName = data.fields[ACCOUNT_FIRSTNAME_FIELD.fieldApiName].value;
            this.lastName = data.fields[ACCOUNT_LASTNAME_FIELD.fieldApiName].value;
        }
    }
        
    // person account custom fields on the contact object
    @track classification;
    
    @wire(getRecord, {
        recordId: '$personContactId',
        fields: CONTACT_FIELDS
    }) wiregetRecordContact({error, data}) {
    
        console.log('getPersonAccountTokens.getRecordContact wire method called');
    
        if (error) {
    
            console.log('getPersonAccountTokens.getRecordContact: error: ', JSON.stringify(error));
    
        } else if (data != undefined && data != null) {
    
            console.log('getPersonAccountTokens.getRecordContact: data: ', JSON.stringify(data));
    
            this.classification = data.fields[CONTACT_CLASSIFICATION_FIELD.fieldApiName].value;
            
        }
    }

}