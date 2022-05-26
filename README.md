# POH Tools

A collection of tools to develop on the Proof of Humanity ecosystem

## POH Dummy

POH Dummy is a dummy smart contract to simulate a registry, the same way proof of humanity does.
As of the current version is very basic. It allows to register the calling address by passing an expiration date.

POHDummy does not replicate the Proof of HUmanity contract behaviours and registration stages. It's rather a simple contract that allows to simulate the validation of a registered user using the same function as in POH (`isRegistered(address)`), by making easy it to register or unregister an address.

### Functions:

- `register(uint256 expiration)`: Registers the sender with the indicated `expiration` date. `expiration` is a UNIX timestamp and must be in the future.
- `unregister()`: Unregisters the sender, as long as it was registered.
- `isRegistered(address account)`: Indicates if the account is registered in the registry. An account is considered to be registered if it's expiration date is greater than the current `block.timestamp`.

## Deployments:

- Kiln: [0xf261c4f93d1b2991bb47e7f295af3b2fc17bd440](https://explorer.kiln.themerge.dev/address/0xf261c4f93d1b2991bb47e7f295af3b2fc17bd440)
