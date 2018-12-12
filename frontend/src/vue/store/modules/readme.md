### Updating models

- Models (`Company`, `Client`, `Project`, `User`, `Template`) are being watched by Vue (`company.vue`, `client-details.vue`, `project-details.vue`, `user-details.vue`, `template-editor.vue`)
- the watching and saving is directed to `auto-saver.vue`
- These are directly editable. The Vue store doesnt allow editing state directly, so all these models are presented by a clone: `new Model(obj.toBackend())`. Don't use `obj.clone()`, this will remove the `_id`.


### Cloning models

- When cloning (`obj.clone()`) the `_id` should be removed. The backend will create a new `_id` when there is none. 
- The backend also should accept a created object that already has an `_id` (and use that _id). This is for (re)creating of an (previously created and deleted) object in a `redo` action.