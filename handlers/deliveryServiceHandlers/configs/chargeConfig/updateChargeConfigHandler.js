async function updateChargeConfigHandler(request, response) {
    const { city_fees } = request.body;
    const user = request.user;

    try {
        const chargeConfig = user.charges_configurations.id(city_fees.config_id);
        if(user.type !== 'delivery') throw new Error('invalid user type');
        if(!chargeConfig) throw new Error('configuration schema not exists');
        chargeConfig.availability = city_fees.availability;
        chargeConfig.fee = city_fees.fee;
        await user.save();

        response.code(200).send({ data: { charge_configurations: user.charges_configurations }, message: "config updated success"});
    }catch(error) {
        response.code(400).send({ data: {}, message: error.message});
    }
}

module.exports = updateChargeConfigHandler;