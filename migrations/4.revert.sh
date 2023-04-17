# Je prends l'identité admin_mytherapist
export PGUSER=spedata
export PGPASSWORD=spedata

# sqitch revert # revert tout
sqitch revert 1.create_tables