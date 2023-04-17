# Je prends l'identité de spedata :
export PGUSER=spedata

# Je supprime la BDD mytherapist et l'utilisateur admin_mytherapist
dropdb mytherapist
echo "BDD supprimée"
dropuser admin_mytherapist
echo "admin_mytherapist supprimé"

# Je crèe la BDD oblog et l'utilisateur admin_mytherapist
createuser admin_mytherapist -P
echo "admin_mytherapist créé"
createdb mytherapist -O admin_mytherapist
echo "BDD créée"

# Je supprime sqitch.conf et sqitch.plan
rm sqitch.conf
rm sqitch.plan

# J'initiase Sqitch
sqitch init mytherapist --target db:pg:mytherapist
echo "Sqitch initialisé"

