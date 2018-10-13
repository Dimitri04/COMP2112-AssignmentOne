# Assignment 1 – Webmail

Using plain Javascript, this assignment requires you to use template literals, access/change the DOM, event handling and object/arrays methods.

**Due Date:**  Sunday, Oct. 14 @ 11:59 pm 

Submission Requirements via Blackboard:
* Pages: <a href="https://dimitri04.github.io/COMP2112-AssignmentOne/index.html">Assingment One</a
* GitHub: <a href="https://github.com/Dimitri04/COMP2112-AssignmentOne">GitHub Repo</a>

## Purpose: 
Take an existing, static email-like HTML template, and make it dynamic via Javascript.


### Application Requirements: 

1.	Display 3 random emails from your custom API
  *	Use of template literals to eventually output HTML code from each email object
  * Use of map (or other looping method) on template literal to display all entries
  * Putting your HTML code in the appropriate place in the DOM via innerHTML (or similar)

2.	Clicking an email in the inbox will add some kind of visual indicator to make it look selected and also, display the email body, subject, name, date in the main section
  *	addEventListener added for each entry to listen for click, when click happens, adding appropriate CSS class to make it look selected
  * the upper section of main should show the email name, subject, date.    In the main section, show the email body.
  * avoid any ‘undefined’ from showing on any fields by gracefully outputting an empty string

3.	Clicking on the Compose button will open a form where you to enter form data for a new email where upon submit, will add a new entry to the inbox (as if you’re emailing yourself; get picture from your github’s avatar_url).
  *	Form shows all relevant fields
  *	After data is entered, clicking the Send button will create a new email  object whose key/values match the form data, then will be added to your inbox.  View is updated to reflect current state.

4.	Clicking delete button will remove currently selected email from inbox.  Clicking on the trash link will allow you to view all items that have been deleted.  Clicking the inbox link again will return you back to the inbox view.
  *	addEventListeners implemented for delete button, trash link, inbox link which updates its current view
  *	Deleting an email moves it to the trash.  While in trash view, clicking Deleted button undo’s the delete and moves the email back to inbox.
  *	Deleting an entry changes the text on the Delete button to “Deleted”.  While in trash view, clicking the “Deleted” button will change text to “Delete”

5.	Whether you click inbox, or trash, it always displays an accurate, current state of the array of objects.  

6.	Use local storage such that it stores the current state of objects (assume  you’ve deleted/added entries) so if the browser refreshes, it does not return back to the view of original state of objects, but rather will return you to the same view you had before refreshing.
  *	Use localStorage to set information of the current state of objects whenever a change happens
  *	Use localStorage to get information so that a browser refresh remembers current state of object and does not default back to the original view.

7.	Document each section of your script with comments.   If you decide to attempt any bonus challenges, add comments near the top of your code what I’m to look out for so as not to miss it.

### Bouns Attempted
1. Show accurate number of unread emails beside ‘Inbox’ Test it by running a setTimeout to fetch a new email and see if the count increases by one.  Or compose new email.

2. Pressing delete key deletes selected email(s).
