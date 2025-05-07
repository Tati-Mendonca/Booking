import { NextRequest, NextResponse } from 'next/server'
import { getCustomersByName } from '@/lib/customer'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')

  if (!name) {
    return NextResponse.json({ message: 'Nome não fornecido' }, { status: 400 })
  }

  try {
    const customer = await getCustomersByName(name)
    return NextResponse.json(customer)
  } catch (error) {
    console.error('Erro ao buscar cliente:', error)
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 })
  }
}
