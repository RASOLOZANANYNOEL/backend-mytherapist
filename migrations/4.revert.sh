# Je prends l'identité admin_mytherapist
export PGUSER=admin_mytherapist
export PGPASSWORD= mytherapist

sqitch revert # revert tout
# sqitch revert 1.create_tables