# automate_dm

docker-compose hosted process which:
--> Probably will contain a location UI to be able to manage instances
Runs from this project.

Uses stork to manage devices

The location project outputs data which will be used to populate the stork device list.
I think probably will emit mqtt topics?  on_added/on_deleted?

and then we can probably just stork device -a/-r from for this

? should location ui  directly reference stork?
I'd rather not, come up w/ solution to be able to link into a stork page for the device
from the config app though -> iframe maybe?


Uses stork to manage automate system.
----
Plugins for:

automate : managed with ansible, which updates a docker instance. 

chipmunk : sends http commands to device

stork-windows : sends http commands to the device

automate_location : updates via docker image

----

