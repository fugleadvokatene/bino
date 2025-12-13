package model

var IsCheckoutStatus = map[Status]bool{
	StatusUnknown:                        false,
	StatusAdmitted:                       false,
	StatusAdopted:                        true,
	StatusReleased:                       true,
	StatusTransferredOutsideOrganization: true,
	StatusDead:                           true,
	StatusEuthanized:                     true,
	StatusDeleted:                        true,
}
