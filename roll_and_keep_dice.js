/**
 * Roll and Keep dice (used in 7th Sea 1st Edition)
 * @author Antoine 'Khazou' Lenoir
 */

/**
 * Define here the HTML form
 */
const rnk_form = `
<p>Fill in the fields</p>
<form>
  <input name="rnk_macro_roll" id="rnk_macro_roll" type="string" maxlength="2" size="2" />
  K 
  <input name="rnk_macro_keep" id="rnk_macro_keep" type="string" maxlength="2" size="2" />
  + 
  <input name="rnk_macro_bonus" id="rnk_macro_bonus" type="string" maxlength="3" size="3" value="0" /><br /><br />
</form>
`;

/**
 * Main function
 */
async function rollAndKeep (html) {
  // Load form from HTML
  const formElement = html[0].querySelector('form');
  const formData = new FormDataExtended(formElement);
  const formDataObject = Object.fromEntries(formData.entries());

  // Define roll formula using form input values (Roll, Keep, Values)
  roll = formDataObject.rnk_macro_roll;
  keep = formDataObject.rnk_macro_keep; 
  bonus = formDataObject.rnk_macro_bonus;

  // Roll and display
  let diceroll = await new Roll(`(${roll}d10k${keep}x>=10)+${bonus}`).evaluate();
  // console.log(diceroll);
  diceroll.toMessage();
} 

// Show the dialog and connect the callback function
let d = new Dialog({
  title: "Roll and Keep",
  content: rnk_form,
  buttons: {
    submit: { label: "Submit", callback: (html) => {
      rollAndKeep(html);
    }},
    cancel: { label: "Cancel" }
  },
  default: "submit",
  render: html => console.log("Register interactivity in the rendered dialog"),
  close: html => console.log("This always is logged no matter which option is chosen")
});

d.render(true);
