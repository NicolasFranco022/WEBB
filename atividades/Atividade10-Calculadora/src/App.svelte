<script>
	import Display from './components/Display.svelte'
	import Keyboard from './components/Keyboard.svelte'

	let name = "0"
</script>

<Display bind:display={name}  />
<Keyboard bind:display={name}/>

<!-- App.svelte -->

<div class="calculator-container">
    <div class="display">{display}</div>
    <div class="buttons-grid">
        <button class="button">7</button>
        <button class="button">8</button>
        <button class="button">9</button>
        <button class="button operator">/</button>

        <button class="button">4</button>
        <button class="button">5</button>
        <button class="button">6</button>
        <button class="button operator">*</button>

        <button class="button">1</button>
        <button class="button">2</button>
        <button class="button">3</button>
        <button class="button operator">-</button>

        <button class="button">0</button>
        <button class="button">.</button>
        <button class="button equal">=</button>
        <button class="button operator">+</button>
    </div>
</div>


<style>
	
	
</style>