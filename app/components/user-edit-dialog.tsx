'use client'

import React, { useState, useEffect } from 'react'
import { updateUser } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState } from '@/components/mutable-dialog'
import { revalidatePath } from 'next/cache'

interface UserEditDialogProps {
  user: User
}

export function UserEditDialog({ user }: UserEditDialogProps) {
  const [currentUser, setCurrentUser] = useState(user)

  const handleEditUser = async (data: UserFormData): Promise<ActionState<User>> => {
    try {
      const updatedUser = await updateUser(currentUser.id, data)
      setCurrentUser(updatedUser)
      return {
        success: true,
        message: `User ${updatedUser.name} updated successfully`,
        data: updatedUser,
      }
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update user',
      }
    }
  }

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <MutableDialog<UserFormData>
      key={currentUser.id}
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleEditUser}
      triggerButtonLabel="Edit"
      editDialogTitle={`Edit ${currentUser.name}`}
      dialogDescription={`Update the details of ${currentUser.name} below.`}
      submitButtonLabel="Save Changes"
      defaultValues={{
        name: currentUser.name,
        email: currentUser.email,
        phoneNumber: currentUser.phoneNumber,
      }}
      onEdit={async (updatedPerson) => {
        const updatedUser = await updateUser(currentUser.id, updatedPerson)
        setCurrentUser(updatedUser)
        revalidatePath("/")
      }}
    />
  )
}